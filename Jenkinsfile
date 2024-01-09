pipeline {
    agent any

    environment {
        GITHUB_CREDENTIALS = credentials('github-token')
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-cred')
    }
    
    tools {
        nodejs 'node18' // 'node-18' should match the installation name in Jenkins configuration
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/Alaa-Esstar/Fiverr-MERN.git', credentialsId: 'github-token']]])
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    dir('client') {
                        withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                            sh 'docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD'
                            sh 'npm install'
                            sh 'npm run build'
                            sh 'docker build -t alaaesstar/frontend-fever .'
                            sh 'docker push alaaesstar/frontend-fever'
                        }
                    }
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    dir('api') {
                        sh 'npm install'
                        sh 'docker build -t alaaesstar/backend-fever .'
                        sh 'docker push alaaesstar/backend-fever'
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Include Kubernetes deployment commands here
                    // This stage will be expanded in the future steps
                    echo 'Deployment to Kubernetes will be added in the future'
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
