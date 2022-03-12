/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import HintDto from '../types/dto/hint.dto'
import SnippetDto from '../types/dto/snippet.dto'
import SuiteDto from '../types/dto/suite.dto'
import TestDto from '../types/dto/test.dto'
import VariableDto from '../types/dto/variable.dto'
import Hint from '../types/schemas/hint.schema'
import Snippet from '../types/schemas/snippet.schema'
import Suite from '../types/schemas/suite.schema'
import Test from '../types/schemas/test.schema'
import Variable from '../types/schemas/variable.schema'

const translateSuiteDtoToSchema = (suite: SuiteDto): Suite => {

    const newSuite = new Suite()

    newSuite.name = suite.name,
    newSuite.suites = suite.suites.map(suite => translateSuiteDtoToSchema(suite))
    newSuite.tests = suite.tests.map(test => translateTestDtoToSchema(test))

    return newSuite
}

const translateTestDtoToSchema = (test: TestDto): Test => {

    const newTest = new Test()

    newTest.name = test.name
    newTest.status = test.status
    newTest.duration = test.duration

    if (test.hint)
        newTest.hint = translateHintDtoToSchema(test.hint)

    return newTest
}

const translateHintDtoToSchema = (hint: HintDto): Hint => {

    const newHint = new Hint()

    newHint.type = hint.type
    newHint.status = hint.status

    if (hint.category)
        newHint.category = hint.category

    if (hint.message)
        newHint.message = hint.message

    if (hint.symbol)
        newHint.symbol = hint.symbol

    if (hint.timeout)
        newHint.timeout = hint.timeout

    if (hint.received)
        newHint.received = translateVariableDtoToSchema(hint.received)

    if (hint.expected)
        newHint.expected = translateVariableDtoToSchema(hint.expected)

    if (hint.snippet)
        newHint.snippet = translateSnippetDtoToSchema(hint.snippet)

    return newHint
}

const translateVariableDtoToSchema = (variable: VariableDto): Variable => {

    const newVariable = new Variable()

    newVariable.value = variable.value
    newVariable.type = variable.type

    return newVariable
}

const translateSnippetDtoToSchema = (snippet: SnippetDto): Snippet => {

    const newSnippet = new Snippet()

    newSnippet.arguments = {
        received: snippet.arguments.received,
        expected: snippet.arguments.expected
    }

    newSnippet.method = snippet.method

    return newSnippet
}

export {
    translateSuiteDtoToSchema
}
