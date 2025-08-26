# Predictor Vocacional con IA
Este proyecto es una aplicación web desarrollada en **Flask** que utiliza un modelo de **Machine Learning** entrenado con redes neuronales (Keras/TensorFlow) para predecir qué carrera universitaria se ajusta mejor al perfil de un usuario según sus respuestas a una encuesta.

## Características principales
- Interfaz web con **Flask** (HTML + CSS en `templates/` y `static/`).
- Procesamiento de respuestas de encuestas con **Pandas** y **Scikit-learn**.
- Uso de un **modelo de Deep Learning (Keras)** almacenado en `model.json` y `model.weights.h5`.
- Manejo de codificación de variables y escalado mediante artefactos `.pkl`.
- Resultados personalizados mostrando el área principal y secundaria sugerida.

## Estructura del proyecto

pagina_proyecto_predictor_vocacional/

│── app.py # Aplicación Flask principal

│── model.json # Arquitectura del modelo Keras

│── model.weights.h5 # Pesos del modelo Keras

│── modelo (1).keras # Modelo completo en formato Keras

│── *.pkl # Archivos de preprocesamiento (scaler, encoders, etc.)

│── respuestas.xlsx # Base de datos de respuestas

│── templates/ # Vistas HTML (index, encuesta, respuestas)

│── static/ # Archivos estáticos (CSS, JS, imágenes)

│── .venv/ # Entorno virtual (opcional)

## Modelo

El modelo está entrenado para recomendar afinidad con las siguientes carreras:

- Ingeniería de Sistemas
- Mercadeo
- Lenguas Modernas
- Ingeniería Química
- Ingeniería Mecatrónica

## Autores
- Michael Forero Pachon
- Adriana Valentina Suarez Cañon
