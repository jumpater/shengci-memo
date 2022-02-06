import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity, StyleSheet, ScrollView, View, TextInput, Pressable, Button, } from 'react-native';
import SelfText from './Common/SelfText';
import StrageClassManager from '../Classes/StrageClassManager';
import Memo from './Common/Memo';
import ModalCore from '../components/Common/ModalCore';
import {useIsFocused} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import LoadAnim from './Common/LoadAnim';

//単語リストフォルダー一覧ページ