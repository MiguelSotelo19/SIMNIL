    //PRACTICA 3 - SISTEMA DE ALARMA DE PARQUEO CON SENSOR ULTRASONICO
    //EQUIPO 2
    // 5°D UTEZ
    
   // Definición de pines
    #define bomba D4

    #define trigger  D0
    #define echo D1

    #define trigger2  D2
    #define echo2 D3

    // const int trigger = 2;  // Pin al que está conectado el trigger del sensor ultrasónico
    // const int echo = 3;     // Pin al que está conectado el echo del sensor ultrasónico

    // const int trigger2 = 4;  // Pin al que está conectado el trigger del sensor ultrasónico
    // const int echo2 = 5;  

    void setup() {
      // Configuración de pines
      Serial.begin(9600);   // Inicialización de la comunicación serial 
      pinMode(trigger, OUTPUT);  // Configuración del LED azul como salida
      pinMode(trigger2, OUTPUT);  // Configuración del LED rojo como salida

      pinMode(echo, INPUT);      // Configuración del pin echo como entrada
      pinMode(echo2, INPUT);      // Configuración del pin echo como entrada

      pinMode(bomba, OUTPUT);
    }

    void loop() {
      // Variables para medir la distancia con el sensor ultrasónico
      long tiempo;
      long distancia;

      float altura = 13;
      int porcentaje = 80;
    
      float nivel;

      // Generación del pulso ultrasónico
      digitalWrite(trigger, LOW);
      delayMicroseconds(5);
      digitalWrite(trigger, HIGH);
      delayMicroseconds(10);
      digitalWrite(trigger, LOW);

      // Medición del tiempo de echo del pulso ultrasónico
      tiempo = pulseIn(echo, HIGH);

      // Cálculo de la distancia 
      distancia = (tiempo * 0.034) / 2;

      // Impresión de la distancia en el monitor serial
      Serial.print("Distancia:");
      Serial.print(distancia);
      Serial.println(" cm");
      delay(100);

      nivel = (altura * porcentaje)/100;

      if(distancia < nivel){
          digitalWrite(bomba, HIGH);
      } else {
         digitalWrite(bomba, LOW);

      }

      // Condiciones para el control de LEDs en función de la distancia medida
      // Si la distancia es mayor a 15 cm, se enciende el LED azul
   /*   if (distancia > 15) {
        digitalWrite(ledAzul, HIGH);
        Serial.print("Viene viene");
      } 

    // Si la distancia es menor o igual a 15 cm pero mayor a 5 cm, se enciende el LED amarillo 
      if (distancia <= 15 && distancia > 5) {
        digitalWrite(ledAzul, LOW);
        digitalWrite(ledAma, HIGH);
        Serial.print("Aguas");
        delayMicroseconds(100);
        digitalWrite(ledAma, LOW);
      } 

      // Si la distancia es menor o igual a 5 cm, se enciende el LED rojo 
      if (distancia <= 5) {
        digitalWrite(ledAma, LOW);
        digitalWrite(ledRojo, HIGH);
        Serial.print("STOOOP");
        delayMicroseconds(50);
        digitalWrite(ledRojo, LOW);
      }*/
    }
