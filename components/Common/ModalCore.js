import React from 'react';
import {Keyboard,Modal, View, Pressable, StyleSheet} from 'react-native';

export default ModalCore=(props)=>{
    return(
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.modalVisible}
          onRequestClose={() => {
            props.setModalVisible(false);
          }}
        >
          <View style={[styles.centeredView, props.wrapStyle]}>
            <View style={[styles.modalView, props.style]}>
              {props.children}
            </View>
          </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      width: '100%',
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
  });