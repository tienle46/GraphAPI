import React, {Component} from "react";
import {
    ListView, Text, View, StyleSheet, Image, Dimensions, TouchableWithoutFeedback, Modal,ActivityIndicator
} from 'react-native';
import {
    Header, Container, Left, Right, Body, Title, Icon, Item, Input, StyleProvider, Thumbnail, Button, Toast,
} from 'native-base'
import AppHeader from './AppHeader';
import ListViewHeader from './ListViewHeader';
import ListViewFooter from './ListViewFooter';
import Items from './Items';
import Swiper from 'react-native-swiper';
import ModalItems from './ModalItems';
import Hyperlink from 'react-native-hyperlink'
var access_token = 'EAACEdEose0cBAHlVwWV6qNHdnCmhLRN9zbhk7w1UsSZCc8MZCZCvjLqh0JLWTzXyNtAIyrn6WpT5mJAD9lxkGL3ZASVW6XBv33mZCzkgKq9egmi2sVrCjI6F5Xs2MQ97AZABlZATUqgaNjqONiwbZCG9DnJcBOZBkGdgiXUjlRXCV7Vm0By3Wwf5ba5Cof8jDivYZD';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!=r2});
        this.state = {
            url: null,
            imageAlbum: null,
            modalVisible: false,
            dataListView: null,
            isLoadingPost: true,
            isLoadingProfile: true,
            profilePicture: null,
            after: null,
            dataSource: new ListView.DataSource({rowHasChanged: (r1,r2) => r1!=r2}),
            data: null,
            name: null,
            isFetching: false,
        }
    }
    
    openModal(image, album, visible) {
        this.setState({
            url: image,
            imageAlbum: album,
            modalVisible: visible
        });

    }

    componentDidMount() {
        const nameUrl = `https://graph.facebook.com/v2.12/WeLoveSeoHyerin?access_token=${access_token}`
        const fetchName = fetch(nameUrl).then(res => res.json()).then(res => {
            this.setState({
                name: res.name
            })
        })
        const profileUrl = `https://graph.facebook.com/v2.12/WeLoveSeoHyerin/photos?access_token=${access_token}`
        const fetchProfile = fetch(profileUrl).then(res => res.json()).then(res => {
                var profilePicUrl = `https://graph.facebook.com/v2.12/${res.data.map(i => i.id)[0]}?fields=images&access_token=${access_token}`;
                const fetchProfilePic = fetch(profilePicUrl).then(res => res.json()).then(res => {
                    const {images} = res
                    if(images) {
                        return images.map(i => i.source)[0]
                    }
                    return null
                }).then(res => {
                    return res
                }).then(res => {
                    this.setState({
                        profilePicture: res,
                        isLoadingProfile: false
                    })
                })
            })
        const fetchPost = fetch('https://graph.facebook.com/v2.12/WeLoveSeoHyerin/posts?limit=10&access_token=' + access_token)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                after: responseJson.paging.cursors.after
            })
            var ids = responseJson.data.map(i => i.id);
            var stories = responseJson.data.map(i => i.story);
            var messages = responseJson.data.map(i => i.message);
            var created_times = responseJson.data.map(i => i.created_time)
            let fetches = []
            for (var i in ids) {
                var dataLV = {};
                if(stories[i]) {
                    dataLV.story = stories[i]
                } else {
                    dataLV.story = null
                }
                if(messages[i]) {
                    dataLV.message = messages[i]
                } else {
                    dataLV.message = null
                }
                dataLV.created_time = created_times[i]
                let postUrl =`https://graph.facebook.com/v2.12/${ids[i]}?fields=attachments&access_token=${access_token}`;
                const fetchData = (function(dataLV) {
                    return fetch(postUrl).then(res => res.json()).then(res => {
                        const {attachments} = res
                        if (attachments){
                            const {data} = attachments
                            if(data) {
                                return data.map(item => {
                                    const {subattachments} = item
                                    const {media} = item
                                    if (subattachments) {
                                        const subData = subattachments.data
                                        if(subData) {
                                            return subData.map(subItem => {
                                                return subItem.media.image.src
                                            })
                                        }
                                    } else if (media) {
                                        return (media && ('image' in media)) ? [media.image.src] : [null]
                                    }
                                })
                            }
                        }
                        return null
                    }).then(res => {
                        console.log('<<<<<<<<',res)
                        const firstRes = res[0];
                        dataLV.source = firstRes
                        return dataLV
                    })
                }.call(this, dataLV))
                fetches.push(fetchData)
            }
            Promise.all(fetches).then(dataLvs => {
                var data = dataLvs
                this.setState({
                    data: data,
                    dataListView: this.state.dataSource.cloneWithRows(data),
                    isLoadingPost: false
                })
            }); 
        });
    }
    
    _onEndReached(){
        this.setState({
            isFetching: true
        })

        const fetchPost = fetch(`https://graph.facebook.com/v2.12/WeLoveSeoHyerin/posts?limit=10&access_token=${access_token}&after=${this.state.after}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    after: responseJson.paging.cursors.after
                })
                var ids = responseJson.data.map(i => i.id);
                var stories = responseJson.data.map(i => i.story);
                var messages = responseJson.data.map(i => i.message);
                var created_times = responseJson.data.map(i => i.created_time)
                let fetches = []
                for (var i in ids) {
                    var dataLV = {};
                    if(stories[i]) {
                        dataLV.story = stories[i]
                    } else {
                        dataLV.story = null
                    }
                    if(messages[i]) {
                        dataLV.message = messages[i]
                    } else {
                        dataLV.message = null
                    }
                    dataLV.created_time = created_times[i]
                    let postUrl =`https://graph.facebook.com/v2.12/${ids[i]}?fields=attachments&access_token=${access_token}`;
                    const fetchData = (function(dataLV) {
                        return fetch(postUrl).then(res => res.json()).then(res => {
                            const {attachments} = res
                            if (attachments){
                                const {data} = attachments
                                if(data) {
                                    return data.map(item => {
                                        const {subattachments} = item
                                        const {media} = item
                                        if (subattachments) {
                                            const subData = subattachments.data
                                            if(subData) {
                                                return subData.map(subItem => {
                                                    return subItem.media.image.src
                                                })
                                            }
                                        } else if (media) {
                                            return (media && ('image' in media)) ? [media.image.src] : [null]
                                        }
                                    })
                                }
                            }
                            return [null]
                        }).then(res => {
                            console.log('>>>>>>', res)
                            const firstRes = res[0];
                            dataLV.source = firstRes
                            return dataLV
                        }).catch((err)=>{
                            throw err
                        })
                    }.call(this, dataLV))
                    fetches.push(fetchData)
                }
                Promise.all(fetches).then(dataLvs => {
                    var data = [...this.state.data,...dataLvs]
                    this.setState({
                        data: data,
                        dataListView: this.state.dataSource.cloneWithRows(data),
                        isLoadingPost: false,
                        isFetching: false
                    })
                }); 
            });
    }

    render() {
        if (this.state.isLoadingPost || this.state.isLoadingProfile) {
            return (
              <View>
                <ActivityIndicator />
              </View>
            );
        }
        return (
            <Container>
                <AppHeader/>
                <ListView
                    onEndReached = {this._onEndReached.bind(this)}
                    onEndReachedThreshold = {30}
                    dataSource = {this.state.dataListView}
                    renderRow = {
                        (rowData) => {
                            return(
                                <View style = {styles.container}>
                                    <ListViewHeader 
                                    thumbnailSource = {{uri: this.state.profilePicture}}
                                    story = {rowData.story}
                                    name = {this.state.name}
                                    time = {rowData.created_time}
                                    location = {rowData.location} />
                                    <Hyperlink linkDefault = {true} linkStyle={ { color: '#2980b9'} }>
                                        <Text style = {styles.message}>{rowData.message}</Text>
                                    </Hyperlink>
                                    <Items imageSource = {rowData.source} action = {this.openModal.bind(this)}/>
                                    <ListViewFooter/>
                                </View>
                            )
                        }
                    }
                />
                <View>
                    {this.state.isFetching ? <View><Text>Loading...</Text></View> : null}
                </View>
                <Modal
                    animationType = 'slide'
                    visible={this.state.modalVisible}
                    transparent = {false}
                    presentationStyle = 'formSheet'
                >
                    <View style = {{position: 'absolute', top: 20, zIndex: 10}}>
                        <Button iconLeft transparent primary onPress = {() => {this.setState({modalVisible: false}) }}>
                            <Icon name='close' />
                        </Button>
                    </View>
                    <ModalItems imageSource = {this.state.imageAlbum}/>
                </Modal>
            </Container>
        )  
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 5,
        position: 'relative'
    },
    message: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom:10,
        fontSize: 14
    },
    imageDetail: {
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    detailModal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    footer: {
        
    }
});