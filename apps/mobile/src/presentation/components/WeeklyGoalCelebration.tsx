import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, Modal, StyleSheet, useWindowDimensions, View } from "react-native";

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

const confettiColors = ["#14B8A6", "#2563EB", "#F43F5E", "#F59E0B", "#22C55E", "#A855F7", "#38BDF8", "#EC4899", "#F97316"];

export function WeeklyGoalCelebration({ visible, onDismiss }: Props) {
  const { width, height } = useWindowDimensions();
  const progress = useRef(new Animated.Value(0)).current;
  const pieces = useMemo(
    () =>
      Array.from({ length: 120 }, (_, index) => ({
        id: index,
        color: confettiColors[index % confettiColors.length],
        launchX: [0.12, 0.5, 0.88][index % 3],
        launchY: index % 4 === 0 ? 0.34 : index % 5 === 0 ? 0.18 : -0.04,
        delay: (index % 12) * 18,
        size: 5 + (index % 5) * 2,
        spread: ((index * 41) % 220) - 110,
        arc: -80 - (index % 9) * 18,
        fall: 0.62 + ((index * 7) % 38) / 100,
        tilt: index % 2 === 0 ? 1 : -1,
        shape: index % 4 === 0 ? "circle" : "strip"
      })),
    []
  );

  useEffect(() => {
    if (!visible) {
      progress.setValue(0);
      return;
    }

    progress.setValue(0);
    const animation = Animated.timing(progress, {
        toValue: 1,
        duration: 2400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
    });
    animation.start(({ finished }) => {
      if (finished) {
        onDismiss();
      }
    });
    return () => animation.stop();
  }, [onDismiss, progress, visible]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onDismiss}>
      <View style={styles.root} pointerEvents="none">
        {pieces.map((piece) => {
          const translateY = progress.interpolate({
            inputRange: [0, 0.35, 1],
            outputRange: [height * piece.launchY - piece.delay, height * piece.launchY + piece.arc, height * piece.fall]
          });
          const translateX = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, piece.spread]
          });
          const rotate = progress.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", `${piece.tilt * (360 + piece.id * 19)}deg`]
          });
          const opacity = progress.interpolate({
            inputRange: [0, 0.08, 0.82, 1],
            outputRange: [0, 1, 1, 0]
          });

          return (
            <Animated.View
              key={piece.id}
              pointerEvents="none"
              style={[
                styles.confetti,
                {
                  width: piece.size,
                  height: piece.shape === "circle" ? piece.size : piece.size * 2.2,
                  borderRadius: piece.shape === "circle" ? piece.size / 2 : 2,
                  left: piece.launchX * width,
                  top: 0,
                  backgroundColor: piece.color,
                  opacity,
                  transform: [{ translateY }, { translateX }, { rotate }]
                }
              ]}
            />
          );
        })}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject
  },
  confetti: {
    position: "absolute",
    borderRadius: 2
  }
});
