import os
from flask import Flask, jsonify, send_from_directory
from flask_migrate import Migrate
<<<<<<< HEAD
=======
from flask_swagger import swagger
from flask_cors import CORS
>>>>>>> 9b6dd05c3792799ed0f6cc54adab4ab57994b07f
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_cors import CORS

<<<<<<< HEAD
# Configuración de Flask
=======
#from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
>>>>>>> 9b6dd05c3792799ed0f6cc54adab4ab57994b07f
app = Flask(__name__)
app.url_map.strict_slashes = False

# Configuración de la base de datos
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
<<<<<<< HEAD
Migrate(app, db, compare_type=True)
db.init_app(app)

# Configuración de CORS
CORS(app, resources={r"/api/*": {"origins": "https://reimagined-telegram-v666jv99r7wvfp4w-3000.app.github.dev"}})

# Configuración del admin
=======
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
>>>>>>> 9b6dd05c3792799ed0f6cc54adab4ab57994b07f
setup_admin(app)

# Configuración de los comandos
setup_commands(app)

# Registrar los endpoints de la API con el prefijo "api"
app.register_blueprint(api, url_prefix='/api')

<<<<<<< HEAD
# Manejar errores y serializarlos como objetos JSON
=======
# Handle/serialize errors like a JSON object
>>>>>>> 9b6dd05c3792799ed0f6cc54adab4ab57994b07f
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

<<<<<<< HEAD
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
=======
# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response
>>>>>>> 9b6dd05c3792799ed0f6cc54adab4ab57994b07f

# Ejecutar la aplicación si se ejecuta este archivo
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
