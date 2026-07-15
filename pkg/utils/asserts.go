package utils

import (
	"reflect"

	"github.com/stretchr/testify/assert"
)

type AssertFunc func(t assert.TestingT, actual interface{}, expected interface{}, msgAndArgs ...interface{}) bool

var AssertFunctions = map[string]AssertFunc{
	"=":             assert.EqualValues,
	"<":             assert.Less,
	"<=":            assert.LessOrEqual,
	">":             assert.Greater,
	">=":            assert.GreaterOrEqual,
	"!=":            assert.NotEqual,
	"contains":      assert.Contains,
	"notContains":   assert.NotContains,
	"type_match":    assert.IsType,
	"len":           lenf,
	"regexMatch":    assert.Regexp,
	"regexNotMatch": assert.NotRegexp,
	"startWith":     startWith,
	"in":            in,
}

func startWith(t assert.TestingT, origin interface{}, target interface{}, msgAndArgs ...interface{}) bool {
	if reflect.TypeOf(origin).Kind() != reflect.String || reflect.TypeOf(target).Kind() != reflect.String {
		return false
	}
	return assert.Regexp(t, "$"+origin.(string), target)

}
func lenf(t assert.TestingT, expectedType interface{}, object interface{}, msgAndArgs ...interface{}) bool {
	if reflect.TypeOf(expectedType).Kind() != reflect.Int {
		return false
	}
	return assert.Len(t, object, expectedType.(int), msgAndArgs)
}

func in(t assert.TestingT, s, contains interface{}, msgAndArgs ...interface{}) bool {
	return assert.Contains(t, contains, s, msgAndArgs)
}
