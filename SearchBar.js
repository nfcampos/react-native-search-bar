var NativeModules, PropTypes, RNSearchBar, React, ReactNative, StyleSheet SearchBar;

React = require('react');

ReactNative = require('react-native');

var TextInputState = require('react-native/lib/TextInputState');

RNSearchBar = ReactNative.requireNativeComponent('RNSearchBar', null);

PropTypes = require('prop-types');

NativeModules = ReactNative.NativeModules;

StyleSheet = ReactNative.StyleSheet

class SearchBar extends React.PureComponent {
  _onChange(e) {
    var base, base1;
    if (typeof (base = this.props).onChange === "function") {
      base.onChange(e);
    }
    return typeof (base1 = this.props).onChangeText === "function" ? base1.onChangeText(e.nativeEvent.text) : void 0;
  }

  _onPress(e) {
    var base, base1, button;
    button = e.nativeEvent.button;
    if (button === 'search') {
      return typeof (base = this.props).onSearchButtonPress === "function" ? base.onSearchButtonPress(e.nativeEvent.searchText) : void 0;
    } else if (button === 'cancel') {
      return typeof (base1 = this.props).onCancelButtonPress === "function" ? base1.onCancelButtonPress() : void 0;
    }
  }

  _onFocus() {
    TextInputState._currentlyFocusedID = ReactNative.findNodeHandle(this);
    if (this.props.onFocus) this.props.onFocus.apply(null, arguments);
  }

  _onBlur() {
    TextInputState._currentlyFocusedID = null;
    if (this.props.onBlur) this.props.onBlur.apply(null, arguments);
  }

  blur() {
    return NativeModules.RNSearchBarManager.blur(ReactNative.findNodeHandle(this));
  }

  focus() {
    return NativeModules.RNSearchBarManager.focus(ReactNative.findNodeHandle(this));
  }

  unFocus() {
    return NativeModules.RNSearchBarManager.unFocus(ReactNative.findNodeHandle(this));
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.showsCancelButton !== this.props.showsCancelButton) {
      NativeModules.RNSearchBarManager.toggleCancelButton(ReactNative.findNodeHandle(this), nextProps.showsCancelButton);
    }
  }

  render() {
    return <RNSearchBar
      style={styles.root}
      onChange={this._onChange}
      onPress={this._onPress}
      {...this.props}
      onFocus={this._onFocus}
      onBlur={this._onBlur}
    />;
  }
});

var styles = StyleSheet.create({
  root: {height: NativeModules.RNSearchBarManager.ComponentHeight}
})

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  text: PropTypes.string,
  barTintColor: PropTypes.string,
  tintColor: PropTypes.string,
  textColor: PropTypes.string,
  textFieldBackgroundColor: PropTypes.string,
  showsCancelButton: PropTypes.bool,
  onChange: PropTypes.func,
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onSearchButtonPress: PropTypes.func,
  onCancelButtonPress: PropTypes.func,
  enablesReturnKeyAutomatically: PropTypes.bool,
  hideBackground: PropTypes.bool,
  barStyle: PropTypes.oneOf(['default', 'black']),
  searchBarStyle: PropTypes.oneOf(['default', 'prominent', 'minimal']),
  editable: PropTypes.bool,
  keyboardType: PropTypes.oneOf(['default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search']),
  keyboardAppearance: PropTypes.oneOf(['default', 'light', 'dark']),
  returnKeyType: PropTypes.oneOf(['done', 'go', 'next', 'search', 'send', 'default', 'emergency-call', 'google', 'join', 'route', 'yahoo']),
  autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
  autoCorrect: PropTypes.bool,
  spellCheck: PropTypes.bool
};

SearchBar.defaultProps = {
  barStyle: 'default',
  searchBarStyle: 'default',
  editable: true
};

module.exports = SearchBar;
