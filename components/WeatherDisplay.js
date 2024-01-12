import { getIconPath, getImagePath } from '../firebaseFunctions/weatherFunction';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Favoris from './FavorisButton';

const WeatherDisplay = ({ location, weather, searchTerm }) => {
  return (
    <View style={styles.mainContainer}>
      {weather && (
        <View>

          <View style={styles.mainContainerDaily}>

          {!searchTerm && <Text style={{color:"white", fontSize:30, fontWeight:"600", position : "absolute", top:-60}}>
              Ma Position
            </Text>}

            
            
            {weather.current.weather[0].main && (
              <Image
                source={getImagePath(weather.current.weather[0].description)}
                style={{ width: 250, height: 250}}
              />
            )}
          
            <View style={styles.containerInfoDaily}>

            <Text style={{ color: "white", fontSize: 72, fontWeight: "500", marginBottom:-13 }}>
                {(weather.current.main.temp - 273.15).toFixed(0)}°
              </Text>

              <Text style={{color:"white", fontSize:26, fontWeight:"700",}}>
              {weather.current.weather[0].main.toUpperCase()}
              </Text>

              <Text style={{color:"white", fontSize:26, fontWeight:"700", marginLeft:20}}>
              {(weather.current.main.temp_max - 273.15).toFixed(0)}°/{(weather.current.main.temp_min - 273.15).toFixed(0)}°
              </Text>

          
            </View>


          </View>


          <View style={{marginTop:20, padding: 7}}>
            {weather.daily.slice(1).map((forecast, index) => {
              const date = new Date(forecast.dt_txt);
              const joursSemaine = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
              const jourSemaine = joursSemaine[date.getDay()];

              return (
                <View key={index} style={styles.containerDayInfo}>

                  <Text style={{fontSize:18, color : "#A3A1A1", width: 110}}>
                   {jourSemaine}
                  </Text>

                  {forecast.weather[0].main && (
                    <Image
                      source={getIconPath(forecast.weather[0].main)}
                      style={{ width: 40, height: 50 }}
                    />
                  )}

                  <Text style={{fontSize:18, color : "#A3A1A1", position : "absolute", right:0}}>

                    {(forecast.main.temp_max - 273.15).toFixed(0)}°      {(forecast.main.temp_min - 273.15).toFixed(0)}°
                  </Text>


                  

                </View>
              );
            })}

            {searchTerm && <Favoris style={styles.fav} cityName={searchTerm} />}

          </View>



        </View>
      )}
    </View>
  );
};

export default WeatherDisplay;

const styles = StyleSheet.create({
  mainContainer: {
    height : "100%",
    width: "100%",
    display : "flex",
    alignItems:"center",
    paddingTop: 145,

  },
  containerInfoDaily:{
    display:"flex",
    flexDirection : "row",
    alignItems:"flex-end",
  },
  mainContainerDaily:{
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    width:"100%",
    // borderColor:"red", borderWidth : 2
  },
  containerDayInfo:{
    display : "flex",
    flexDirection :"row",
    marginTop:8,
    alignItems : "center",

  },
  fav:{
    position:"absolute",
    top:0,
    borderColor:"red"
    , borderWidth : 2
  }

});
