pipeline {
    agent any
    
    tools {nodejs "Nodejs"}

    stages {
        stage('Checkout') {
            steps{
                git credentialsId: 'ps_bitbucket', url: 'https://tools.publicis.sapient.com/bitbucket/scm/xwefb/tarun-gupta.git'
            }
        }
       	stage('Initialise') {
            steps {
                sh 'npm install'
            }
        }
        stage('SonarQube analysis') {
        	environment {
            	scannerHome = tool 'sonar-scanner'
        	}
			steps {
				withSonarQubeEnv('Sonarqube Scanner') {
					sh '''
					${scannerHome}/bin/sonar-scanner \
					'''
				}
			}
    	}
        stage('Build') {
            parallel {
                stage('gateway') {
                    steps {
                        sh 'npm run build'
                    }
                }
                stage('browse-service') {
                    steps {
                        sh 'npm run build vid-browse'
                    }
                }
                stage('search-service') {
                    steps {
                        sh 'npm run build vid-search'
                    }
                }
            }
        }
    	stage('Docker Containerization') {

            parallel {
                stage('gateway') {
                    steps {
                        sh 'docker build -t vid-gateway -f Dockerfile --target vid-gateway .'
                    }
                }
                stage('browse-service') {
                    steps {
                        sh 'docker build -t vid-browse -f Dockerfile --target vid-browse .'
                    }
                }
                stage('search-service') {
                    steps {
                        sh 'docker build -t vid-search -f Dockerfile --target vid-search .'
                    }
                }
            }

        }
        stage('Deploy') {
            steps {
                script {
                    kubernetes {
                        yamlFile 'vid-gateway-deployment.yaml'
                    }
                    kubernetes {
                        yamlFile 'vid-gateway-service.yaml'
                    }
                }
            }
        }
    }
    
}
