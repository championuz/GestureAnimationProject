import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {
  PanGestureHandler,
  GestureHandlerRootView,
  TapGestureHandler
} from 'react-native-gesture-handler';


const App = () => {
const pan = useSharedValue(false);
const startingPosition = 0;
const x = useSharedValue(startingPosition);
const y = useSharedValue(startingPosition);

const newPanEvent = useAnimatedGestureHandler({
  onStart: (event, ctx) => {
    pan.value = true;
    ctx.startX = x.value;
    ctx.startY = y.value;
  },
  onActive: (event, ctx) => {
    x.value = ctx.startX + event.translationX;
    y.value = ctx.startY + event.translationY;
  },
  onEnd: (event, ctx) => {
    pan.value = false;
    x.value = withSpring(startingPosition);
    y.value = withSpring(startingPosition);
  },
});

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }, { translateY: y.value }]
    };
  });

  const [like, setLike] = React.useState({
    onliked: false,
  });

  const updateLiked = () => {
      setLike({
        onliked: !like.onliked,
      });
    };

  return (
   <View style={styles.sectionContainer}>
    <GestureHandlerRootView>
    <PanGestureHandler onGestureEvent={newPanEvent}>
    <Animated.View style={animStyle}>
      <View style={styles.container}>
        <TapGestureHandler
        numberOfTaps={2}
        onActivated={() => (
          console.log('Double Tapped!')
        )}>
        <Animated.Image style={styles.Image} source={{uri: 'https://uxmag.com/wp-content/uploads/2014/12/gestures-and-animations-small.jpg'}} />
        </TapGestureHandler>
        <View style={styles.cover}>
          <Text style={styles.title}>The Animated Library</Text>
        <Text style={styles.textDescription}>The Animated library is designed to make animations fluid, powerful, and painless to build and maintain. Animated focuses on declarative relationships between inputs and outputs, configurable transforms in between, and start/stop methods to control time-based animation execution.</Text>
        {like.onliked ?
        <Image style={styles.icon} source={require('./image/heartemp32.png')} />
        :
        <Image style={styles.icon} source={require('./image/heartfilled32.png')} />
      }
      </View>
      </View>
    </Animated.View>
    </PanGestureHandler>
    </GestureHandlerRootView>

    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f3f5',
    borderRadius: 14,
    
  },
  ball: {
    width: 200,
    height: 200,
    borderRadius: 100,
    elevation: 33,
    shadowOffset: {width: 1, height: 1},
    backgroundColor: "#fff",
    shadowColor: "blue",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  container: {
    width: 315,
    height: 450,
    borderRadius: 14,
    elevation: 33,
    shadowOffset: {width: 1, height: 1},
    backgroundColor: "#fff",
    shadowColor: "blue",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cover: {
    paddingVertical: 10,
    paddingHorizontal: 10,

  },
  Image: {
    width: '100%',
    height: 240,
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
  },
  icon: {
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    color: '#800000',
    fontWeight: 'bold',
  },
  textDescription: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  highlight: {
    fontWeight: '700',
  },
});

