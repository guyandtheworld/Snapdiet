import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  AsyncStorage,
  ImageBackground
} from "react-native";
import { Text, Button } from "native-base";

class Calorie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyGoal: 0,
      goalGreen: "#78CC5B"
    };
  }

  textbind = text => {
    if (!isNaN(text) && text != "") {
      this.setState({
        dailyGoal: parseInt(text)
      });
    } else {
      this.setState({
        dailyGoal: 0
      });
    }
  };

  increaseDailyGoal = () => {
    this.setState(
      {
        dailyGoal: this.props.dailyGoal + 100
      },
      () => {
        this.updateDailyGoal();
      }
    );
  };

  decreaseDailyGoal = () => {
    if (this.props.dailyGoal - 100 >= 0) {
      this.setState(
        {
          dailyGoal: this.props.dailyGoal - 100
        },
        () => {
          this.updateDailyGoal();
        }
      );
    } else {
      this.setState(
        {
          dailyGoal: 0
        },
        () => {
          this.updateDailyGoal();
        }
      );
    }
  };

  updateDailyGoal = () => {
    this.props.update("updateGoal", { dailyGoal: this.state.dailyGoal });
    storeDailyGoalOffline = async () => {
      try {
        await AsyncStorage.setItem(
          "SNAPDIET_DAILYGOAL",
          this.state.dailyGoal.toString()
        );
      } catch (e) {
        console.log(e);
      }
    };
    storeDailyGoalOffline();
  };

  render() {

    const bgimg = require("./background.jpg");

    return (
      <ImageBackground
        source={bgimg}
        style={{
          height: "auto",
          width: "auto",
          minHeight: "100%",
          minWidth: "100%"
        }}
      >
        <KeyboardAvoidingView
          style={{
            backgroundColor: "rgba(255,255,255,0.7)",
            minHeight: "100%",
            minWidth: "100%"
          }}
          behavior="padding"
        >
          <View style={styles.container}>

            <Text style={styles.header}> Calories consumed </Text>
            <Text
              style={[styles.currentCal, { color: this.props.currentColor }]}
            >
              {" "}
              {this.props.currentCalorie}{" "}
            </Text>

            <Text style={styles.header}> Daily Calorie Goal </Text>
            <Text style={styles.goalCal}> {this.props.dailyGoal} </Text>
            
            <View style={styles.buttonContainer}>

              <Button
                success
                onPress={() => {
                  this.decreaseDailyGoal();
                }}
              >
                <Text> -100 </Text>
              </Button>

              <Button
                warning
                style={{ marginLeft: 10 }}
                onPress={ () => {
                  this.increaseDailyGoal();
                  }
                }
              >
                <Text> +100 </Text>
              </Button>

            </View>

            <Text style={styles.bottomText}>
              {" "}
              Change Daily Calorie Goal{" "}
            </Text>

          </View>

        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 10,
  },
  header: {
    fontSize: 33,
    fontFamily: "openSans-bold", 
    color: "rgba(0,0,0,0.7)",
    marginTop: 5,
  },
  currentCal: {
    fontSize: 90,
    fontWeight: "bold"
  },
  goalCal: {
    fontSize: 90,
    fontWeight: "bold",
    color: "#57CBFF"
  },
  calorieGoalInput: {
    width: "70%",
    height: 70,
    paddingLeft: 5,
    paddingRight: 5
  },
  calorieSetButton: {
    marginLeft: 15,
    marginTop: 15
  },
  infobox: {
    color: "rgba(0,0,0,0.6)",
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 12
  },
  bottomText: {
    color: "rgba(0,0,0,0.5)",
    fontFamily: "openSans",
  }
});

export default connect(
  store => {
    return store;
  },
  dispatch => {
    return {
      update: (dispatchType, dispatchPayload) => {
        dispatch({ type: dispatchType, payload: dispatchPayload });
      }
    };
  }
)(Calorie);
