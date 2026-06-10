pipeline {
   agent any
   environment {
       COMPOSE_PROJECT_NAME = "entrega1_ci"
       BACKEND_URL          = "http://localhost:4000"
       FRONTEND_URL         = "http://localhost:8080"
   }
   stages {
       stage('Checkout') {
           steps { git branch: 'main', url: 'https://github.com/SofixAni/entrega1.git' }
       }
       stage('Verificar entorno') {
           steps { sh 'docker --version' }
       }
       stage('Build') {
           steps { sh 'docker compose build --no-cache' }
       }
       stage('Deploy') {
           steps {
               sh 'docker compose up -d'
               sh 'sleep 15'
               sh 'docker compose ps'
           }
       }
       stage('Pruebas - Backend') {
           steps {
               sh 'curl -f ${BACKEND_URL}/api/health'
               sh 'curl -f ${BACKEND_URL}/api/estudiantes'
           }
       }
       stage('Pruebas - Comunicacion entre contenedores') {
           steps {
               sh 'docker exec entrega1-frontend ping -c 3 backend'
               sh 'docker exec entrega1-frontend wget -qO- http://backend:4000/api/health'
           }
       }
       stage('Pruebas - Frontend') {
           steps { sh 'curl -f ${FRONTEND_URL}' }
       }
   }
   post {
       always { sh 'docker compose down -v || true' }
       success { echo 'Pipeline completado con exito.' }
       failure { sh 'docker compose logs --tail=50 || true' }
   }
}
