import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    modal: {
        flex: 1,
        padding: 20,
        marginTop: 20,
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
    },
    bottomView: {
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalView: {
        width: '110%',
        height: 400,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -1
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        margin: 10,
    } ,
    closeButton: {
        alignSelf: 'flex-end'
    },
    addressModal: {
        backgroundColor: '#e1761e',
    },
    autocompleteInput: {
        width: 300,
        backgroundColor: '#000000'
    }
});
