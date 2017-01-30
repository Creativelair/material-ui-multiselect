import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';
import UnCheckedIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank';

class MultiSelectField extends Component {
  static propTypes = {
    /**
     * If true, the width will automatically be set according to the
     * items inside the menu.
     * To control the width in CSS instead, leave this prop set to `false`.
     */
    autoWidth: PropTypes.bool,
    /**
     * The `MenuItem` elements to populate the select field with.
     * If the menu items have a `label` prop, that value will
     * represent the selected menu item in the rendered select field.
     */
    children: PropTypes.node,
    /**
     * List of available options to be selected.
     */
    dataSource: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    /**
     * Configuration of each item in the dataSource
     */
    dataSourceConfig: PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
    /**
     * If true, the select field will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * Override the inline-styles of the error element.
     */
    errorStyle: PropTypes.object,
    /**
     * The error content to display.
     */
    errorText: PropTypes.node,
    /**
     * If true, the floating label will float even when no value is selected.
     */
    floatingLabelFixed: PropTypes.bool,
    /**
     * Override the inline-styles of the floating label.
     */
    floatingLabelStyle: PropTypes.object,
    /**
     * The content of the floating label.
     */
    floatingLabelText: PropTypes.node,
    /**
     * If true, the select field will take up the full width of its container.
     */
    fullWidth: PropTypes.bool,
    /**
     * Override the inline-styles of the hint element.
     */
    hintStyle: PropTypes.object,
    /**
     * The hint content to display.
     */
    hintText: PropTypes.node,
    /**
     * Override the inline-styles of the icon element.
     */
    iconStyle: PropTypes.object,
    /**
     * The id prop for the text field.
     */
    id: PropTypes.string,
    /**
     * Override the label style when the select field is inactive.
     */
    labelStyle: PropTypes.object,
    /**
     * Override the inline-styles of the underlying `List` element.
     */
    listStyle: PropTypes.object,
    /**
     * Override the default max-height of the underlying `DropDownMenu` element.
     */
    maxHeight: PropTypes.number,
    /**
     * Override the inline-styles of menu items.
     */
    menuItemStyle: PropTypes.object,
    /**
     * Override the inline-styles of the underlying `DropDownMenu` element.
     */
    menuStyle: PropTypes.object,
    /** @ignore */
    onBlur: PropTypes.func,
    /**
     * Callback function fired when a menu item is selected.
     *
     * @param {object} event TouchTap event targeting the menu item
     * that was selected.
     * @param {number} key The index of the selected menu item.
     * @param {any} payload The `value` prop of the selected menu item.
     */
    onChange: PropTypes.func,
    /** @ignore */
    onFocus: PropTypes.func,
    /**
     * Callback function fired when a menu item is selected
     */
    onRequestAdd: PropTypes.func,
    /**
     * Callback function fired when a menu item is removed
     */
    onRequestDelete: PropTypes.func,
    /**
     * Override the inline-styles of selected menu items.
     */
    selectedMenuItemStyle: PropTypes.object,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * Override the inline-styles of the underline element when the select
     * field is disabled.
     */
    underlineDisabledStyle: PropTypes.object,
    /**
     * Override the inline-styles of the underline element when the select field
     * is focused.
     */
    underlineFocusStyle: PropTypes.object,
    /**
     * Override the inline-styles of the underline element.
     */
    underlineStyle: PropTypes.object,
    /**
     * The values currently selected.
     */
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
  };

  static defaultProps = {
    autoWidth: false,
    disabled: false,
    fullWidth: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.setState({
      isOpen: false,
      selectedValues: '',
    });
  }

  componentDidMount() {
    this.root.getElementsByTagName('input')[0].setAttribute('disabled', 'disabled');
  }

  closeMenu() {
    this.setState(Object.assign({}, this.state, {
      isOpen: false,
    }), () => {
      findDOMNode(this.root).focus();
    });
  }

  openMenu() {
    if (!this.props.disabled) {
      this.setState(Object.assign({}, this.state, {
        isOpen: true,
      }));
    }
  }

  handleMenuChange = () => {
    const {onChange, value, dataSourceConfig} = this.props;

    this.setState(Object.assign({}, this.state, {
      selectedValues: value.length ? value.map((v) => v[dataSourceConfig.text]) : '',
    }));

    if (onChange) onChange(value);
  }

  handleClick = (event) => {
    event.preventDefault();
    this.openMenu();
  }

  handleMenuEscKeyDown = () => this.closeMenu();

  handlePopoverClose = () => this.closeMenu();

  render() {
    const {
      autoWidth,
      style,
      disabled,
      id,
      underlineDisabledStyle,
      underlineFocusStyle,
      menuItemStyle,
      selectedMenuItemStyle,
      underlineStyle,
      errorStyle,
      floatingLabelFixed,
      floatingLabelText,
      floatingLabelStyle,
      hintStyle,
      hintText,
      fullWidth,
      errorText,
      listStyle,
      maxHeight,
      menuStyle,
      dataSource,
      dataSourceConfig,
      value,
    } = this.props;

    const menuItems = this.state.isOpen && dataSource && dataSource.reduce((nodes, child, index) => {
      const isSelected = value.includes(child);
      return [...nodes, (
        <MenuItem
          key={index}
          tabIndex={index}
          value={child}
          checked={isSelected}
          leftIcon={(!isSelected) ? <UnCheckedIcon /> : null}
          primaryText={child[dataSourceConfig.text]}
          disableFocusRipple={true}
          innerDivStyle={{paddingTop: 5, paddingBottom: 5}}
        />
      )];
    }, []);

    return (
      <div ref={(ref) => (this.root = ref)}>
        <TextField
          style={Object.assign({}, style, {cursor: 'pointer'})}
          disabled={disabled}
          floatingLabelFixed={floatingLabelFixed}
          floatingLabelText={floatingLabelText}
          floatingLabelStyle={floatingLabelStyle}
          hintStyle={hintStyle}
          hintText={(!hintText && !floatingLabelText) ? ' ' : hintText}
          fullWidth={fullWidth}
          errorText={errorText}
          underlineStyle={underlineStyle}
          errorStyle={errorStyle}
          id={id}
          underlineDisabledStyle={underlineDisabledStyle}
          underlineFocusStyle={underlineFocusStyle}
          value={this.state.selectedValues}
          onTouchTap={this.handleClick}
        />
        <Popover
          open={this.state.isOpen}
          anchorEl={this.root}
          canAutoPosition={false}
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
          targetOrigin={{vertical: 'top', horizontal: 'left'}}
          useLayerForClickAway={false}
          onRequestClose={this.handlePopoverClose}
        >
          <Menu
            ref={(ref) => (this.menu = ref)}
            style={menuStyle}
            value={value}
            onChange={this.handleMenuChange}
            onEscKeyDown={this.handleMenuEscKeyDown}
            multiple={true}
            desktop={true}
            menuItemStyle={menuItemStyle}
            selectedMenuItemStyle={selectedMenuItemStyle}
            autoWidth={autoWidth}
            listStyle={listStyle}
            maxHeight={maxHeight}
          >
            {menuItems.length ? menuItems : <MenuItem primaryText="No match found" disabled={true} />}
          </Menu>
        </Popover>
      </div>
    );
  }
}

export default MultiSelectField;
