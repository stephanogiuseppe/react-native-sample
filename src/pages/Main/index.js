import React, { Component } from 'react'
import { Keyboard, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import api from './../../services/api'
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText
} from './styles'

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
    loading: false
  }

  handleAddUserSubmit = async () => {
    const { users, newUser } = this.state

    this.setState({ loading: true })

    const response = await api.get(`/users/${newUser}`)

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url
    }

    this.setState({
      users: [...users, data],
      newUser: '',
      loading: false
    })

    Keyboard.dismiss()
  }

  render() {
    const { users, newUser, loading } = this.state

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            placeholder="Add user"
            returnKeyType="send"
            onSubmitEditing={this.handleAddUserSubmit}
          />

          <SubmitButton loading={loading} onPress={this.handleAddUserSubmit}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Icon name="add" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

              <ProfileButton onPress={() => {}}>
                <ProfileButtonText>See profile</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    )
  }
}

Main.navigationOptions = {
  title: 'Users'
}
