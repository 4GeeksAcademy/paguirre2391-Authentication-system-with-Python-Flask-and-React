import os
from flask import Flask, jsonify, send_from_directory
from flask_migrate import Migrate
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_cors import CORS

# Configuración de Flask
app = Flask(__name__)
app.url_map.strict_slashes = False

# Configuración de la base de datos
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
Migrate(app, db, compare_type=True)
db.init_app(app)

# Configuración de CORS
CORS(app, resources={r"/api/*": {"origins": "https://reimagined-telegram-v666jv99r7wvfp4w-3000.app.github.dev"}})

# Configuración del admin
setup_admin(app)

# Configuración de los comandos
setup_commands(app)

# Registrar los endpoints de la API con el prefijo "api"
app.register_blueprint(api, url_prefix='/api')

# Manejar errores y serializarlos como objetos JSON
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Generar el sitemap con todos los endpoints
@app.route('/')
def sitemap():
    return generate_sitemap(app)

# Definir la ruta al directorio de archivos estáticos
static_file_dir = os.path.join(os.path.dirname(__file__), 'static')

# Servir cualquier otro archivo estático
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    return send_from_directory(static_file_dir, path)

# Ejecutar la aplicación si se ejecuta este archivo
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
