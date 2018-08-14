import React, { Component } from 'react'
import { object, bool } from 'prop-types'
import getBoundsForNode from './getBoundsForNode'

const createSelectable = WrappedComponent =>
  class SelectableItem extends Component {
    static propTypes = {
      selected: bool,
    }

    static defaultProps = {
      selected: false,
    }

    static contextTypes = {
      selectable: object,
    }

    state = {
      selected: this.props.selected,
      selecting: false,
    }

    componentDidMount() {
      this.registerSelectable()
    }

    componentWillUnmount() {
      this.context.selectable.unregister(this)
    }

    onClickHandle = () => {
      console.log('clicked on element')
      this.setState({
        selected: !this.selected,
      })
    }

    registerSelectable = containerScroll => {
      this.bounds = getBoundsForNode(this.node, containerScroll)
      this.context.selectable.register(this)
    }

    selectableRef = ref => (this.node = ref)

    render() {
      console.log('props.selected')
      console.log(this.props.selected)

      console.log('this.state.selected')
      console.log(this.state.selected)

      return (
        <WrappedComponent
          {...this.props}
          onClick={this.onClickHandle}
          selected={this.state.selected}
          selecting={this.state.selecting}
          selectableRef={this.selectableRef}
        />
      )
    }
  }

export default createSelectable
