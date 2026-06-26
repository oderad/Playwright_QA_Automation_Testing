from flask import Flask, request, jsonify

app = Flask(__name__)

# In-memory database
users = []
next_id = 1

API_KEY = "secret123"


# ------------------------
# AUTHENTICATION
# ------------------------
def check_auth():
    api_key = request.headers.get("X-API-Key")

    if api_key != API_KEY:
        return jsonify({"error": "Unauthorized"}), 401

    return None


# ------------------------
# GET CURRENT USER
# (simulated login)
# ------------------------
def get_current_user():
    username = request.headers.get("X-Username")

    for user in users:
        if user["username"] == username:
            return user

    return None


# ------------------------
# CREATE + GET USERS
# ------------------------
@app.route("/users", methods=["GET", "POST"])
def users_route():
    global next_id

    auth_error = check_auth()
    if auth_error:
        return auth_error

    if request.method == "POST":
        data = request.get_json()

        # Validation
        if not data:
            return jsonify({"error": "Request body is required"}), 400

        if not data.get("username"):
            return jsonify({"error": "username is required"}), 400

        if not data.get("name"):
            return jsonify({"error": "name is required"}), 400

        role = data.get("role", "user")

        # Duplicate username check
        for user in users:
            if user["username"] == data["username"]:
                return jsonify({"error": "Username already exists"}), 409

        user = {
            "id": next_id,
            "username": data["username"],
            "name": data["name"],
            "role": role
        }

        users.append(user)
        next_id += 1

        return jsonify(user), 201

    return jsonify(users), 200


# ------------------------
# UPDATE USER
# ------------------------
@app.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):

    auth_error = check_auth()
    if auth_error:
        return auth_error

    current_user = get_current_user()

    if not current_user:
        return jsonify({"error": "User identity required"}), 401

    # Find target user
    target_user = None

    for user in users:
        if user["id"] == user_id:
            target_user = user
            break

    if not target_user:
        return jsonify({"error": "User not found"}), 404

    # Authorization
    if (
        current_user["role"] != "admin"
        and current_user["id"] != user_id
    ):
        return jsonify({"error": "Forbidden"}), 403

    data = request.get_json()

    # Validation
    if not data:
        return jsonify({"error": "Request body is required"}), 400

    if not data.get("username"):
        return jsonify({"error": "username is required"}), 400

    if not data.get("name"):
        return jsonify({"error": "name is required"}), 400

    target_user["username"] = data["username"]
    target_user["name"] = data["name"]

    # Optional role update
    target_user["role"] = data.get("role", target_user["role"])

    return jsonify(target_user), 200


# ------------------------
# DELETE USER
# ------------------------
@app.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):

    auth_error = check_auth()
    if auth_error:
        return auth_error

    current_user = get_current_user()

    if not current_user:
        return jsonify({"error": "User identity required"}), 401

    target_user = None

    for user in users:
        if user["id"] == user_id:
            target_user = user
            break

    if not target_user:
        return jsonify({"error": "User not found"}), 404

    # Authorization
    if (
        current_user["role"] != "admin"
        and current_user["id"] != user_id
    ):
        return jsonify({"error": "Forbidden"}), 403

    users.remove(target_user)

    return jsonify({"message": "User deleted"}), 200


# ------------------------
# RUN SERVER
# ------------------------
if __name__ == "__main__":
    app.run(debug=True)