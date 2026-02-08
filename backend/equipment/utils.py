import pandas as pd

def analyze_csv(file_path):
    df = pd.read_csv(file_path)

    summary = {
        "total_equipment": len(df),
        "average_flowrate": round(df["Flowrate"].mean(), 2),
        "average_pressure": round(df["Pressure"].mean(), 2),
        "average_temperature": round(df["Temperature"].mean(), 2),
        "equipment_type_distribution": df["Type"].value_counts().to_dict()
    }

    return df.to_dict(orient="records"), summary
