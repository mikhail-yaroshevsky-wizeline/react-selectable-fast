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

    componentWillReceiveProps(nextProps) {
      console.log('received new props')
      this.setState({ selected: nextProps.selected })
      // if (this.props.selected !== nextProps.selected) {
      //   console.log('update selected state!!')
      // }
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
