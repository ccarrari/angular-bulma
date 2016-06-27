'use strict';

describe('bulma.directives.dropdown', function() {

  beforeEach(module('bulma.directives'));

  var $compile;
  var $rootScope;
  var $document;

  beforeEach(inject(function(_$compile_, _$rootScope_, _$document_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $document = _$document_;
  }));

  function getCompiledElement() {
    var element = $compile('<button class="bu-dropdown" align="{{align}}"><p></p></button>')($rootScope);
    $document.append(element);
    $rootScope.$digest();
    return element;
  }

  it('Wraps the content inside a .bu-dropdown-body div', function() {
    var element = getCompiledElement();
    var dropdownBody = element.find('.bu-dropdown-body');
    expect(dropdownBody.find('p').length).to.equal(1);
  });

  it('Hides the .bu-dropdown-body div by default', function() {
    var element = getCompiledElement();
    var dropdownBody = element.find('.bu-dropdown-body');
    expect(dropdownBody.css('display')).to.equal('none');
  });

  it('Shows the .bu-dropdown-body div when clicked', function() {
    var element = getCompiledElement();
    var dropdownBody = element.find('.bu-dropdown-body');
    element.trigger('click');
    expect(dropdownBody.css('display')).to.equal('block');
  });

  it('Hides the .bu-dropdown-body div if clicked twice', function() {
    var element = getCompiledElement();
    var dropdownBody = element.find('.bu-dropdown-body');
    element.trigger('click');
    element.trigger('click');
    expect(dropdownBody.css('display')).to.equal('none');
  });

  it('Hides the .bu-dropdown-body div if clicked outside', function() {
    var element = getCompiledElement();
    var dropdownBody = element.find('.bu-dropdown-body');
    element.trigger('click');
    $document.trigger('click');
    expect(dropdownBody.css('display')).to.equal('none');
  });

  it('Shows the .bu-dropdown-body div if clicked tree times', function() {
    var element = getCompiledElement();
    var dropdownBody = element.find('.bu-dropdown-body');
    element.trigger('click');
    element.trigger('click');
    element.trigger('click');
    expect(dropdownBody.css('display')).to.equal('block');
  });

  it('Aligns the .bu-dropdown-body div to the left by default', function() {
    var element = getCompiledElement();
    var dropdownBody = element.find('.bu-dropdown-body');
    expect(dropdownBody.css('left')).to.equal('0px');
  });

  it('Aligns the .bu-dropdown-body div to the right if told so', function() {
    $rootScope.align = 'right';
    var element = getCompiledElement();
    var dropdownBody = element.find('.bu-dropdown-body');
    expect(dropdownBody.css('right')).to.equal('0px');
  });

  it('Works with any tag', function() {
    var element = $compile('<div class="bu-dropdown"></div>')($rootScope);
    var dropdownBody = element.find('.bu-dropdown-body');
    expect(dropdownBody).to.be.ok;
    element = $compile('<span class="bu-dropdown"></span>')($rootScope);
    dropdownBody = element.find('.bu-dropdown-body');
    expect(dropdownBody).to.be.ok;
  });

});
