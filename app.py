# app.py

from flask import Flask, render_template, request, jsonify, render_template, url_for, session
import pandas as pd
import numpy as np
import joblib  # Cambiado para importar joblib directamente
import sklearn
import tensorflow as tf
from tensorflow.keras.models import model_from_json
import traceback 


# Importamos Flask y otros módulos necesarios

# Creamos una instancia de la aplicación Flask
# __name__ es un argumento que Flask utiliza para saber dónde buscar recursos
app = Flask(__name__)
app.secret_key = 'tu_llave_secreta_muy_secreta' # Necesario para usar sesiones


@app.route('/procesar_encuesta', methods=['POST']) # Este es procesar_encuesta_endpoint
def procesar_encuesta_endpoint():
    try:
        datos_usuario = request.get_json()
        print(f"Array de respuestas recibido del cliente: {datos_usuario}")

        if not isinstance(datos_usuario, list):
            return jsonify({"status": "error", "message": "El formato de los datos recibidos no es una lista como se esperaba."}), 400

        ordered_input_column_names = [
            '¿Que tanto disfrutas realizar las siguientes actividades?  [Escribir codigo o programar]', 
            '¿Que tanto disfrutas realizar las siguientes actividades?  [Investigar sobre reacciones quimicas o experimentos de laboratorio]',
            '¿Que tanto disfrutas realizar las siguientes actividades?  [Diseñar mecanismos electronicos o automatizar procesos]',
            '¿Que tanto disfrutas realizar las siguientes actividades?  [Aprender idiomas o conocer nuevas culturas]',
            '¿Que tanto disfrutas realizar las siguientes actividades?  [Estudiar como vender un producto o analizar tendencias de consumo]',
            '¿En cuáles de estas áreas consideras que tienes habilidad o facilidad? (Selecciona hasta 3)', 
            '  ¿Que entorno de trabajo te resulta mas atractivo?  ', 
            'selecciona la frase con la cual sientas mas afinidad',
            'Me gusta mas:',
            'Me llama mas la atencion:',
            '¿Que importancia le das a lo siguiente al elegir tu carrera?    [Posibilidades de innovacion o desarrollo tecnologico]', 
            '¿Que importancia le das a lo siguiente al elegir tu carrera?    [Posibilidad de trabajar en industria o laboratorios]',
            '¿Que importancia le das a lo siguiente al elegir tu carrera?    [Oportunidad de viajar o tener contacto intercultural]',
            '¿Que importancia le das a lo siguiente al elegir tu carrera?    [Creatividad para diseñar campañas o soluciones]',
            '¿Que importancia le das a lo siguiente al elegir tu carrera?    [Contribuir al desarrollo de la ciencia o salud]',
            'Ingenieria de sistemas',
            'Mercadeo',
            'Lenguas Modernas',
            'Ingenieria  Quimica',
            'Ingenieria Mecatronica',
            
        ]
        # ------------------------------------------------------------------------------------

        if len(datos_usuario) != len(ordered_input_column_names):
            msg = (f"Error en la cantidad de respuestas. Se esperaban {len(ordered_input_column_names)} "
                   f"columnas/respuestas (según la configuración del servidor) pero se recibieron {len(datos_usuario)} respuestas.")
            print(msg)
            return jsonify({"status": "error", "message": msg}), 400

        # Crear DataFrame asignando los nombres de columna definidos
        df_datos_usuario = pd.DataFrame([datos_usuario], columns=ordered_input_column_names)
        print(f"DataFrame creado a partir del array (primeras filas):\n{df_datos_usuario.head()}")
        print(f"Columnas del DataFrame creado: {df_datos_usuario.columns.tolist()}")

        # --- Cargar modelo y artefactos de preprocesamiento ---
        # (Este bloque de código permanece igual: cargar Keras model, scaler, feature_encoder_X, etc.)
        json_file = open('model.json', 'r')
        loaded_model_json = json_file.read()
        json_file.close()
        model = model_from_json(loaded_model_json)
        model.load_weights("model.weights.h5")
        print("Modelo Keras cargado.")

        scaler = joblib.load('escalador_orientacion (1).pkl')
        feature_encoder_X = joblib.load('feature_encoder_X (2).pkl')
        categorical_cols_original_X = joblib.load('categorical_cols_for_ohe_X (1).pkl')
        numerical_cols_X = joblib.load('numerical_cols_X (1).pkl')
        final_feature_names_ordered_X = joblib.load('final_feature_order_X (1).pkl')
        print("Archivos cargados correctamente.")

        # --- Preprocesamiento de los datos del usuario ---

        # 1. Manejar la pregunta de selección múltiple
    
        nuevas_columnas = '¿En cuáles de estas áreas consideras que tienes habilidad o facilidad? (Selecciona hasta 3)' # Asegúrate que este nombre esté en tu lista `ordered_input_column_names`
        
        # Verificar que la columna multi-select exista en df_input (debería si ordered_input_column_names es correcta)
        if nuevas_columnas not in df_datos_usuario.columns:
            raise ValueError(f"La columna de selección múltiple '{nuevas_columnas}' no se encontró en el DataFrame. Revisa 'ordered_input_column_names'.")

        skills_list = df_datos_usuario[nuevas_columnas].iloc[0]
        if not isinstance(skills_list, list):
            skills_list = [skills_list] if pd.notna(skills_list) else []
        
        processed_skills_data = {}
        base_skill_col_name = "¿En cuáles de estas áreas consideras que tienes habilidad o facilidad?" # Base para las nuevas columnas ej: "...?1", "...?2"
        for i in range(3):
            col_name_skill = f"{base_skill_col_name}{i+1}"
            if i < len(skills_list):
                processed_skills_data[col_name_skill] = skills_list[i]
            else:
                processed_skills_data[col_name_skill] = "0"

        df_skills_processed = pd.DataFrame([processed_skills_data], index=df_datos_usuario.index)
        
        df_columnas_nuevas = df_datos_usuario.drop(columns=[nuevas_columnas])
        df_columnas_nuevas = pd.concat([df_columnas_nuevas, df_skills_processed], axis=1)
        print(f"DataFrame después de procesar selección múltiple (primeras filas):\n{df_columnas_nuevas.head()}")
        print(f"Columnas después de procesar multi-select: {df_columnas_nuevas.columns.tolist()}")

        # 2. Separar características categóricas y numéricas
        missing_cat_cols = [col for col in categorical_cols_original_X if col not in df_columnas_nuevas.columns]
        if missing_cat_cols:
            print(f"Columnas en df_prepared: {df_columnas_nuevas.columns.tolist()}")
            print(f"Columnas categóricas esperadas: {categorical_cols_original_X}")
            raise ValueError(f"Faltan columnas categóricas en los datos de entrada DESPUÉS de la asignación de nombres: {missing_cat_cols}")
        
        missing_num_cols = [col for col in numerical_cols_X if col not in df_columnas_nuevas.columns]
        if missing_num_cols:
            raise ValueError(f"Faltan columnas numéricas en los datos de entrada DESPUÉS de la asignación de nombres: {missing_num_cols}")

        df_cat_usuario = df_columnas_nuevas[categorical_cols_original_X]
        df_num_usuario = df_columnas_nuevas[numerical_cols_X].astype(float)


        # 3. Aplicar OneHotEncoder a las características categóricas
        df_cat_encoded_array = feature_encoder_X.transform(df_cat_usuario)
        df_cat_encoded = pd.DataFrame(df_cat_encoded_array.toarray(),
                                      columns=feature_encoder_X.get_feature_names_out(categorical_cols_original_X),
                                      index=df_num_usuario.index)
        
        # 4. Combinar características numéricas y categóricas OHE
        df_final = pd.concat([df_num_usuario, df_cat_encoded], axis=1)

        # 5. Reordenar columnas
        missing_final_cols = [col for col in final_feature_names_ordered_X if col not in df_final.columns]
        if missing_final_cols:
            print(f"Columnas en df_combined: {df_final.columns.tolist()}")
            print(f"Columnas esperadas en final_feature_names_ordered_X: {final_feature_names_ordered_X}")
            raise ValueError(f"Faltan columnas en el DataFrame combinado antes de escalar: {missing_final_cols}")
        df_orderenado = df_final[final_feature_names_ordered_X]

        # 6. Escalar los datos
        data_scaled = scaler.transform(df_orderenado)

        # --- Predicción ---
        predicciones = model.predict(data_scaled)
        print(f"Predicciones : {predicciones}")

        # --- Formatear Resultados ---
        labels = ['Ingeniería de sistemas', 'Mercadeo', 'Lenguas Modernas', 'Ingeniería Química', 'Ingeniería Mecatrónica']
        labels_map_to_js_id = {
            'Ingeniería de sistemas': 'sistemas', 'Mercadeo': 'mercadeo',
            'Lenguas Modernas': 'lenguas', 'Ingeniería Química': 'quimica',
            'Ingeniería Mecatrónica': 'mecatronica'
        }
        probabilities_list = predicciones[0]
        afinidades_calculadas = []
        for i, prob_float in enumerate(probabilities_list):
            long_name = labels[i]
            js_id = labels_map_to_js_id.get(long_name, f"unknown_id_{i}")
            afinidades_calculadas.append({"id": js_id, "porcentaje": round(float(prob_float) * 100, 2)})

        afinidades_calculadas.sort(key=lambda x: x['porcentaje'], reverse=True)
        id_principal = afinidades_calculadas[0]['id'] if afinidades_calculadas else None
        id_secundaria = None
        if len(afinidades_calculadas) > 1:
            if afinidades_calculadas[1]['id'] != id_principal:
                id_secundaria = afinidades_calculadas[1]['id']
            elif len(afinidades_calculadas) > 2 and afinidades_calculadas[2]['id'] != id_principal:
                 id_secundaria = afinidades_calculadas[2]['id']

        resultados_modelo_final = {
            "afinidadesCalculadas": afinidades_calculadas,
            "idAreaPrincipal": id_principal,
            "idAreaSecundaria": id_secundaria
        }
        session['resultados_encuesta'] = resultados_modelo_final

        return jsonify({
            "status": "success", "message": "Respuestas procesadas exitosamente.",
            "redirect_url": url_for('respuestas'), "resultados": resultados_modelo_final
        })

    except ValueError as ve:
        print(f"Error de Valor en el procesamiento: {str(ve)}")
        print(traceback.format_exc())
        return jsonify({"status": "error", "message": f"Error en los datos de entrada o configuración: {str(ve)}"}), 400
    except FileNotFoundError as fnfe:
        print(f"Error: Archivo no encontrado: {str(fnfe)}")
        print(traceback.format_exc())
        return jsonify({"status": "error", "message": f"Error del servidor: Falta un archivo necesario ({str(fnfe)})."}), 500
    except Exception as e:
        print(f"Error procesando la encuesta: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"status": "error", "message": f"Ocurrió un error inesperado en el servidor."}), 500

   
@app.route('/api/mis_resultados_vocacionales_calculados', methods=['GET'])

def api_resultados_vocacionales():
    resultados_guardados = session.get('resultados_encuesta', None)

    if resultados_guardados:
        return jsonify(resultados_guardados)
    else:
        # Si no hay resultados, devuelve un error o una estructura vacía que tu JS pueda manejar
        return jsonify({
            "error": "No se encontraron resultados para esta sesión.",
            "afinidadesCalculadas": [],
            "idAreaPrincipal": None,
            "idAreaSecundaria": None
        }), 404

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/encuesta')
def encuesta():
    return render_template('encuesta.html')

@app.route('/respuestas')
def respuestas():
    return render_template('respuestas.html')


if __name__ == '__main__':
    # app.run() inicia el servidor de desarrollo de Flask
    # debug=True activa el modo depuración, que recarga el servidor automáticamente con cambios
    app.run(debug=True)
    # El bloque if __name__ == '__main__': asegura que el servidor solo se inicie si este archivo es ejecutado directamente
