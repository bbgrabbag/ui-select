uis.directive('uiSelectMatch', ['uiSelectConfig', function(uiSelectConfig) {
  return {
    restrict: 'EA',
    require: '^uiSelect',
    replace: true,
    transclude: true,
    templateUrl: function(tElement) {
      // Needed so the uiSelect can detect the transcluded content
      tElement.addClass('ui-select-match');

      var parent = tElement.parent();
      // Gets theme attribute from parent (ui-select)
      var theme = getAttribute(parent, 'theme') || uiSelectConfig.theme;
      var multi = angular.isDefined(getAttribute(parent, 'multiple'));

      return theme + (multi ? '/match-multiple.tpl.html' : '/match.tpl.html');
    },
    link: function(scope, element, attrs, $select) {
      $select.lockChoiceExpression = attrs.uiLockChoice;
      attrs.$observe('placeholder', function(placeholder) {
        $select.placeholder = placeholder !== undefined ? placeholder : uiSelectConfig.placeholder;
      });

      function setAllowClearButton(allow) {
        allow = (allow && allow === 'true');
        if ($select.clearSelectionType === 'button') {
          $select.allowClear = allow;
          $select.allowBlankValueClear = false;
        }
        if ($select.clearSelectionType === 'blank-value') {
          $select.allowBlankValueClear = allow;
          $select.allowClear = false;
        }
      }

      attrs.$observe('allowClear', setAllowClearButton);
      setAllowClearButton(attrs.allowClear);

      if($select.multiple){
        $select.sizeSearchInput();
      }

    }
  };

  function getAttribute(elem, attribute) {
    if (elem[0].hasAttribute(attribute))
      return elem.attr(attribute);

    if (elem[0].hasAttribute('data-' + attribute))
      return elem.attr('data-' + attribute);

    if (elem[0].hasAttribute('x-' + attribute))
      return elem.attr('x-' + attribute);
  }
}]);
