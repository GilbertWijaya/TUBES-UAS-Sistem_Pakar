from flask import request, jsonify
from ..models import Rules
from ..extensions import db
from . import rule_api_bp

# get all data
@rule_api_bp.route("/rule", methods=['GET'])
def getalldata():
    data = Rules.query.all()
    result = [
        {
            "id": d.id,
            "goal": d.Goal,
            "rule1": d.Rule_1,
            "rule2": d.Rule_2,
            "rule3": d.Rule_3,
            "value": d.Value
        }
        for d in data
    ]
    return jsonify(result), 200

# get data by rule
@rule_api_bp.route("/rule/rules", methods=['GET'])
def getdatabyrule():
    goal = request.args.get("goal")
    rule1 = request.args.get("rule1")
    rule2 = request.args.get("rule2")  # disesuaikan dengan URL
    rule3 = request.args.get("rule3")

    if not all([goal, rule1, rule2, rule3]):
        return jsonify({"error": "All fields are required"}), 400

    data = Rules.query.filter_by(Goal=goal).all()
    goals = []

    for d in data:
        if d.Rule_1 == rule1 and d.Rule_2 == rule2 and d.Rule_3 == rule3:
            goals.append({
                "Goal": d.Goal,
                "Rule_1": d.Rule_1,
                "Rule_2": d.Rule_2,
                "Rule_3": d.Rule_3,
                "Value" : d.Value
            })

    return jsonify({"result": goals}), 200
# contoh endpointnya: http://127.0.0.1:5000/api/data/rules?goal=Dekorasi&rule1=Plastik/Pvc&rule2=Non-Bundling&rule3=Besar

#create data
@rule_api_bp.route("/rule", methods=['POST'])
def createdata():
    datareq = request.json or {}

    goal = datareq.get("goal")
    rule1 = datareq.get("rule1")
    rule2 = datareq.get("rule2")
    rule3 = datareq.get("rule3")
    value = datareq.get("value")

    if not all([goal, rule1, rule2, rule3, value]):
        return jsonify({"error": "All fields are required"}), 400

    data = Rules(Goal=goal, Rule_1=rule1, Rule_2=rule2, Rule_3=rule3, Value=value)
    
    try:
        db.session.add(data)
        db.session.commit()
        return jsonify({
            "message": "Data created successfully",
            "data": {
                "id": data.id,
                "goal": data.Goal,
                "rule1": data.Rule_1,
                "rule2": data.Rule_2,
                "rule3": data.Rule_3,
                "value": data.Value
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# del data
@rule_api_bp.route("/rule/<int:id>", methods=['DELETE'])
def delete_data(id):
    # Cari data berdasarkan ID
    data = Rules.query.get(id)
    
    # Jika data tidak ditemukan
    if not data:
        return jsonify({"error": "Data not found"}), 404
    
    try:
        db.session.delete(data)
        db.session.commit()
        return jsonify({"message": f"Data with id {id} has been deleted successfully"}), 200
    except Exception as e:
        # Rollback jika terjadi error
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
