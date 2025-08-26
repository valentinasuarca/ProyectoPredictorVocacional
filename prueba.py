import joblib
try:
    cat_cols = joblib.load('categorical_cols_for_ohe_X (1).pkl')
    if len(cat_cols) > 2:
        problematic_column_name = cat_cols[2]
        print(f"La columna categórica en el índice 2 (tercera columna) es: '{problematic_column_name}'")
    else:
        print(f"La lista de columnas categóricas tiene menos de 3 elementos. Columnas: {cat_cols}")
except Exception as e:
    print(f"Error cargando o inspeccionando 'categorical_cols_for_ohe_X (1).pkl': {e}")