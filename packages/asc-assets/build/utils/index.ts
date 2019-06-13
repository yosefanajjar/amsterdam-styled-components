// eslint-disable-next-line import/no-extraneous-dependencies
import chalk from 'chalk'
import { AbstractNode, Environment, Node } from '../typings'

import assert = require('assert')
import fs = require('fs-extra')
import path = require('path')
import rimraf = require('rimraf')

export function normalizeNode(node: Node, debugName?: string): AbstractNode {
  const tag = node.tagName
  if (!tag) {
    throw new TypeError(`${debugName} Element should have no no-tag node`)
  }
  const attrs = node.attrs.reduce((acc, { name, value }) => {
    Object.defineProperty(acc, name, { value, enumerable: true })
    return acc
  }, {})
  const children = node.childNodes.map(child => normalizeNode(child, debugName))
  const result: AbstractNode = {
    tag,
    attrs,
  }
  if (children.length) {
    result.children = children
  }
  return result
}

/**
 * Parse the node generated by parse5 into the abstract tree.
 * @param node the node that need parsing.
 * @param debugName debug name, used in assert statement.
 */
export function generateAbstractTree(
  node: Node,
  debugName?: string,
): AbstractNode {
  assert(node, debugName)
  assert(node.tagName === 'svg', debugName)
  const viewBox = node.attrs.find(({ name }) => name === 'viewBox')!
  assert(viewBox, debugName)
  const size: number[] = viewBox!.value
    .split(' ')
    .slice(2)
    .map(str => Number.parseInt(str, 10))
  assert(
    size.length === 2,
    `The size tuple should be [ width, height ], but got [ ${size[0]}, ${size[1]} ] [${debugName}]`,
  )
  const oneLevelPathNodes = node.childNodes.filter(
    ({ nodeName, childNodes }) =>
      nodeName !== 'style' && childNodes.length === 0,
  )
  assert(oneLevelPathNodes.length >= 1, debugName)

  return normalizeNode(node, debugName)
}

export const log = {
  info(message: string) {
    // eslint-disable-next-line no-console
    return console.log(chalk.green(`🌟 [Generate] ${message}`))
  },
  notice(message: string) {
    // eslint-disable-next-line no-console
    return console.log(chalk.blueBright(`🌟 [Notice] ${message}`))
  },
}

/**
 * Clear by using 'rimraf'.
 */
export async function clear(env: Environment) {
  log.notice(`Clear folders.`)

  return Promise.all([
    ...(Object.keys(env.paths) as Array<keyof typeof env.paths>)
      .filter(key => key.endsWith('OUTPUT')) // DO NOT DELETE THIS LINE!!!
      .map(key => {
        // This is evil. Make sure you just delete the OUTPUT.
        log.notice(`Delete ${path.relative(env.base, env.paths[key])}.`)
        return new Promise(resolve => rimraf(env.paths[key], resolve))
      }),
    new Promise(resolve => {
      const filename = './tsconfig.tsbuildinfo'
      log.notice(`Delete ${path.relative(env.base, filename)}.`)
      rimraf(filename, resolve)
    }),
  ])
}

export function isAccessable(url: string) {
  let accessable = false
  try {
    fs.accessSync(url)
    accessable = true
  } catch (error) {
    accessable = false
  }
  return accessable
}