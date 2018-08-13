import React, { Component } from 'react'
import { object, bool } from 'prop-types'
import getBoundsForNode from './getBoundsForNode'

const createSelectable = WrappedComponent =>
  class SelectableItem extends Component {
    constructor(props) {
      super(props)

      console.log('props.selected')
      console.log(props.selected)

      this.state = {
        selected: props.selected,
        selecting: false,
      }

      console.log('this.state.selected')
      console.log(this.state.selected)
    }

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
          selected={this.state.selected}
          selecting={this.state.selecting}
          selectableRef={this.selectableRef}
        />
      )
    }
  }

export default createSelectable
