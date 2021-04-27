import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { connect } from 'react-redux';

import { css } from '../Styles';
import Header from '../Components/Header';
import Panel from '../Components/Panel';
import Floor from '../Components/Floor';
import Threed from '../Components/Threed';

class RootContainer extends React.Component {

    state = {
        name: '',
        width: 0,
        height: 0,
    }

    componentDidMount() {
        this.props
        console.log(this.props)
    }

    render() {
        return (
            <SafeAreaView style={css('flex-1')}>
                <Header />
                <View style={css('flex-1')}>
                    {
                        !this.props.show3D ?
                            this.props.floors.map(floor => (
                                <Floor key={floor.name} {...this.state.floor} />
                            ))
                            :
                            <Threed />
                    }
                </View>
                <Panel />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({ app }) => ({
    floors: app.floors,
    show3D: app.show3D
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)

