module.exports = json2csv

// eslint-disable
function json2csv (s) {
  const delimiter = ','
  const nobreaks = false
  const broke = false
  const brokeArray = false
  let A = null
  const keys = {}
  if (s.trim() !== '') {
    try {
      A = JSON.parse(s)
    } catch (e) {
      try {
        A = eval('(' + s + ')')
      } catch (e) {
        try {
          s = s.trim()
          if (s.charAt(0) === '{' || s.charAt(0) === '[') {
            A = JSON.parse('[\n' + s.split('\n').join(',\n').replace(/,\s*$/, '') + '\n]')
          } else {
            console.log('Invalid JSON entered.' + (e.Description ? e.Description : ''))
            return
          }
        } catch (e) {
          console.log('Invalid JSON entered.' + (e.Description ? e.Description : ''))
          return
        }
      }
      s = JSON.stringify(A)
    }
    if (broke && brokeArray !== '') {
      try {
        A = eval(brokeArray)
        s = JSON.stringify(A, null, 4)
      } catch (e) {
        console.log('Array name or JSON not valid')
        return
      }
    }
  }
  try {
    s = JSON.stringify(JSON.parse(s), function (key, value) {
      if (_.isArray(value)) keys[key] = 1
      return value
    })
    s = JSON.stringify(JSON.parse(s), function (key, value) {
      if (!_.isArray(value) && key in keys) return [value]
      return value
    })
  } catch (e) {

  }
  const inArray = arrayFrom(JSON.parse(s))
  const outArray = []
  for (const row in inArray) {
    outArray[outArray.length] = parseObject(inArray[row])
  }
  const options = {}
  options.separator = delimiter
  options.headers = true
  options.noBreaks = nobreaks
  options.dateOutFormat = ''
  return $.csv.fromObjects(outArray, options)
}

const $ = {}
$.csv = {
  defaults: {
    separator: ',',
    delimiter: '"',
    headers: true,
    noBreaks: false
  },

  hooks: {},

  parsers: {
    parse: function (csv, options) {
      // cache settings
      const separator = options.separator
      const delimiter = options.delimiter

      // set initial state if it's missing
      if (!options.state.rowNum) {
        options.state.rowNum = 1
      }
      if (!options.state.colNum) {
        options.state.colNum = 1
      }

      // clear initial state
      const data = []
      let entry = []
      let state = 0
      let value = ''
      let exit = false

      function endOfEntry () {
        // reset the state
        state = 0
        value = ''

        // if 'start' hasn't been met, don't output
        if (options.start && options.state.rowNum < options.start) {
          // update global state
          entry = []
          options.state.rowNum++
          options.state.colNum = 1
          return
        }

        if (options.onParseEntry === undefined) {
          // onParseEntry hook not set
          data.push(entry)
        } else {
          const hookVal = options.onParseEntry(entry, options.state) // onParseEntry Hook
          // false skips the row, configurable through a hook
          if (hookVal !== false) {
            data.push(hookVal)
          }
        }
        // console.log('entry:' + entry);

        // cleanup
        entry = []

        // if 'end' is met, stop parsing
        if (options.end && options.state.rowNum >= options.end) {
          exit = true
        }

        // update global state
        options.state.rowNum++
        options.state.colNum = 1
      }

      function endOfValue () {
        if (options.onParseValue === undefined) {
          // onParseValue hook not set
          entry.push(value)
        } else {
          const hook = options.onParseValue(value, options.state) // onParseValue Hook
          // false skips the row, configurable through a hook
          if (hook !== false) {
            entry.push(hook)
          }
        }
        // console.log('value:' + value);
        // reset the state
        value = ''
        state = 0
        // update global state
        options.state.colNum++
      }

      // escape regex-specific control chars
      const escSeparator = RegExp.escape(separator)
      const escDelimiter = RegExp.escape(delimiter)

      // compile the regEx str using the custom delimiter/separator
      let match = /(D|S|\r\n|\n|\r|[^DS\r\n]+)/
      let matchSrc = match.source
      matchSrc = matchSrc.replace(/S/g, escSeparator)
      matchSrc = matchSrc.replace(/D/g, escDelimiter)
      match = RegExp(matchSrc, 'gm')

      // put on your fancy pants...
      // process control chars individually, use look-ahead on non-control chars
      csv.replace(match, function (m0) {
        if (exit) {
          return
        }
        switch (state) {
          // the start of a value
          case 0:
            // null last value
            if (m0 === separator) {
              value += ''
              endOfValue()
              break
            }
            // opening delimiter
            if (m0 === delimiter) {
              state = 1
              break
            }
            // null last value
            if (/^(\r\n|\n|\r)$/.test(m0)) {
              endOfValue()
              endOfEntry()
              break
            }
            // un-delimited value
            value += m0
            state = 3
            break

          // delimited input
          case 1:
            // second delimiter? check further
            if (m0 === delimiter) {
              state = 2
              break
            }
            // delimited data
            value += m0
            state = 1
            break

          // delimiter found in delimited input
          case 2:
            // escaped delimiter?
            if (m0 === delimiter) {
              value += m0
              state = 1
              break
            }
            // null value
            if (m0 === separator) {
              endOfValue()
              break
            }
            // end of entry
            if (/^(\r\n|\n|\r)$/.test(m0)) {
              endOfValue()
              endOfEntry()
              break
            }
            // broken paser?
            throw new Error('CSVDataError: Illegal State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']')

          // un-delimited input
          case 3:
            // null last value
            if (m0 === separator) {
              endOfValue()
              break
            }
            // end of entry
            if (/^(\r\n|\n|\r)$/.test(m0)) {
              endOfValue()
              endOfEntry()
              break
            }
            if (m0 === delimiter) {
              // non-compliant data
              throw new Error('CSVDataError: Illegal Quote [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']')
            }
            // broken parser?
            throw new Error('CSVDataError: Illegal Data [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']')
          default:
            // shenanigans
            throw new Error('CSVDataError: Unknown State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']')
        }
        // console.log('val:' + m0 + ' state:' + state);
      })

      // submit the last entry
      // ignore null last line
      if (entry.length !== 0) {
        endOfValue()
        endOfEntry()
      }

      return data
    },

    parseEntry: function (csv, options) {
      // cache settings
      const separator = options.separator
      const delimiter = options.delimiter

      // set initial state if it's missing
      if (!options.state.rowNum) {
        options.state.rowNum = 1
      }
      if (!options.state.colNum) {
        options.state.colNum = 1
      }

      // clear initial state
      const entry = []
      let state = 0
      let value = ''

      function endOfValue () {
        if (options.onParseValue === undefined) {
          // onParseValue hook not set
          entry.push(value)
        } else {
          const hook = options.onParseValue(value, options.state) // onParseValue Hook
          // false skips the value, configurable through a hook
          if (hook !== false) {
            entry.push(hook)
          }
        }
        // reset the state
        value = ''
        state = 0
        // update global state
        options.state.colNum++
      }

      // checked for a cached regEx first
      if (!options.match) {
        // escape regex-specific control chars
        const escSeparator = RegExp.escape(separator)
        const escDelimiter = RegExp.escape(delimiter)

        // compile the regEx str using the custom delimiter/separator
        const match = /(D|S|\n|\r|[^DS\r\n]+)/
        let matchSrc = match.source
        matchSrc = matchSrc.replace(/S/g, escSeparator)
        matchSrc = matchSrc.replace(/D/g, escDelimiter)
        options.match = RegExp(matchSrc, 'gm')
      }

      // put on your fancy pants...
      // process control chars individually, use look-ahead on non-control chars
      csv.replace(options.match, function (m0) {
        switch (state) {
          // the start of a value
          case 0:
            // null last value
            if (m0 === separator) {
              value += ''
              endOfValue()
              break
            }
            // opening delimiter
            if (m0 === delimiter) {
              state = 1
              break
            }
            // skip un-delimited new-lines
            if (m0 === '\n' || m0 === '\r') {
              break
            }
            // un-delimited value
            value += m0
            state = 3
            break

          // delimited input
          case 1:
            // second delimiter? check further
            if (m0 === delimiter) {
              state = 2
              break
            }
            // delimited data
            value += m0
            state = 1
            break

          // delimiter found in delimited input
          case 2:
            // escaped delimiter?
            if (m0 === delimiter) {
              value += m0
              state = 1
              break
            }
            // null value
            if (m0 === separator) {
              endOfValue()
              break
            }
            // skip un-delimited new-lines
            if (m0 === '\n' || m0 === '\r') {
              break
            }
            // broken paser?
            throw new Error('CSVDataError: Illegal State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']')

          // un-delimited input
          case 3:
            // null last value
            if (m0 === separator) {
              endOfValue()
              break
            }
            // skip un-delimited new-lines
            if (m0 === '\n' || m0 === '\r') {
              break
            }
            // non-compliant data
            if (m0 === delimiter) {
              throw new Error('CSVDataError: Illegal Quote [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']')
            }
            // broken parser?
            throw new Error('CSVDataError: Illegal Data [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']')
          default:
            // shenanigans
            throw new Error('CSVDataError: Unknown State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']')
        }
        // console.log('val:' + m0 + ' state:' + state);
      })

      // submit the last value
      endOfValue()

      return entry
    }
  },

  helpers: {

    /**
     * $.csv.helpers.collectPropertyNames(objectsArray)
     * Collects all unique property names from all passed objects.
     *
     * @param {Array} objects Objects to collect properties from.
     *
     * Returns an array of property names (array will be empty,
     * if objects have no own properties).
     */
    collectPropertyNames: function (objects) {
      let o
      let propName
      const props = []
      for (o in objects) {
        for (propName in objects[o]) {
          if ((objects[o].hasOwnProperty(propName)) &&
            (props.indexOf(propName) < 0) &&
            (typeof objects[o][propName] !== 'function')
          ) {
            props.push(propName)
          }
        }
      }
      return props
    }
  },

  /**
   * $.csv.toArray(csv)
   * Converts a CSV entry string to a javascript array.
   *
   * @param {Array} csv The string containing the CSV data.
   * @param {Object} [options] An object containing user-defined options.
   * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
   * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
   *
   * This method deals with simple CSV strings only. It's useful if you only
   * need to parse a single entry. If you need to parse more than one line,
   * use $.csv2Array instead.
   */
  toArray: function (csv, options, callback) {
    options = (options !== undefined ? options : {})
    const config = {}
    config.callback = ((callback !== undefined && typeof (callback) === 'function') ? callback : false)
    config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator
    config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter
    const state = (options.state !== undefined ? options.state : {})

    // setup
    options = {
      delimiter: config.delimiter,
      separator: config.separator,
      onParseEntry: options.onParseEntry,
      onParseValue: options.onParseValue,
      state: state
    }

    const entry = $.csv.parsers.parseEntry(csv, options)

    // push the value to a callback if one is defined
    if (!config.callback) {
      return entry
    } else {
      config.callback('', entry)
    }
  },
  /**
   * $.csv.fromArrays(arrays)
   * Converts a javascript array to a CSV String.
   *
   * @param {Array} arrays An array containing an array of CSV entries.
   * @param {Object} [options] An object containing user-defined options.
   * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
   * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
   *
   * This method generates a CSV file from an array of arrays (representing entries).
   */
  fromArrays: function (arrays, options, callback) {
    options = (options !== undefined ? options : {})
    const config = {}
    config.callback = ((callback !== undefined && typeof (callback) === 'function') ? callback : false)
    config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator
    config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter
    config.noBreaks = 'noBreaks' in options ? options.noBreaks : $.csv.defaults.noBreaks

    let output = ''
    let line
    let lineValues
    let i
    let j

    for (i = 0; i < arrays.length; i++) {
      line = arrays[i]
      lineValues = []
      for (j = 0; j < line.length; j++) {
        let strValue = (line[j] === undefined || line[j] === null)
          ? ''
          : line[j].toString()

        // MODIFICATION by Dan:
        if (options.noBreaks) {
          strValue = strValue.replace(/\r\n|\r|\n/gm, ' ')
        }
        // MODIFICATION by Eric:
        // make the delimiter replacement global
        // (workaround until jquery-csv is replaced entirely)
        if (strValue.indexOf(config.delimiter) > -1) {
          const delRegex = new RegExp(config.delimiter, 'g')
          strValue = strValue.replace(delRegex, config.delimiter + config.delimiter)
        }

        let escMatcher = '\n|\r|S|D'
        escMatcher = escMatcher.replace('S', config.separator.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'))
        escMatcher = escMatcher.replace('D', config.delimiter.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'))

        if (strValue.search(escMatcher) > -1) {
          strValue = config.delimiter + strValue + config.delimiter
        }
        lineValues.push(strValue)
      }
      output += lineValues.join(config.separator) + '\n'
    }

    // push the value to a callback if one is defined
    if (!config.callback) {
      return output
    } else {
      config.callback('', output)
    }
  },

  /**
   * $.csv.fromObjects(objects)
   * Converts a javascript dictionary to a CSV string.
   *
   * @param {Object} objects An array of objects containing the data.
   * @param {Object} [options] An object containing user-defined options.
   * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
   * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
   * @param {Character} [sortOrder] Sort order of columns (named after
   *   object properties). Use 'alpha' for alphabetic. Default is 'declare',
   *   which means, that properties will _probably_ appear in order they were
   *   declared for the object. But without any guarantee.
   * @param {Character or Array} [manualOrder] Manually order columns. May be
   * a strin in a same csv format as an output or an array of header names
   * (array items won't be parsed). All the properties, not present in
   * `manualOrder` will be appended to the end in accordance with `sortOrder`
   * option. So the `manualOrder` always takes preference, if present.
   *
   * This method generates a CSV file from an array of objects (name:value pairs).
   * It starts by detecting the headers and adding them as the first line of
   * the CSV file, followed by a structured dump of the data.
   */
  fromObjects: function (objects, options, callback) {
    options = (options !== undefined ? options : {})
    const config = {}
    config.callback = ((callback !== undefined && typeof (callback) === 'function') ? callback : false)
    config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator
    config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter
    config.headers = 'headers' in options ? options.headers : $.csv.defaults.headers
    config.sortOrder = 'sortOrder' in options ? options.sortOrder : 'declare'
    config.noBreaks = 'noBreaks' in options ? options.noBreaks : false
    config.manualOrder = 'manualOrder' in options ? options.manualOrder : []
    config.transform = options.transform

    // added by ERIC, return just the arrays
    config.justArrays = 'justArrays' in options ? options.justArrays : false

    if (typeof config.manualOrder === 'string') {
      config.manualOrder = $.csv.toArray(config.manualOrder, config)
    }

    if (config.transform !== undefined) {
      const origObjects = objects
      objects = []

      let i
      for (i = 0; i < origObjects.length; i++) {
        objects.push(config.transform.call(undefined, origObjects[i]))
      }
    }

    let props = $.csv.helpers.collectPropertyNames(objects)

    if (config.sortOrder === 'alpha') {
      props.sort()
    } // else {} - nothing to do for 'declare' order

    if (config.manualOrder.length > 0) {
      const propsManual = [].concat(config.manualOrder)
      var p
      for (p = 0; p < props.length; p++) {
        if (propsManual.indexOf(props[p]) < 0) {
          propsManual.push(props[p])
        }
      }
      props = propsManual
    }

    let o
    var p
    let line
    const output = []
    let propName
    if (config.headers) {
      output.push(props)
    }

    for (o = 0; o < objects.length; o++) {
      line = []
      for (p = 0; p < props.length; p++) {
        propName = props[p]
        if (propName in objects[o] && typeof objects[o][propName] !== 'function') {
          line.push(objects[o][propName])
        } else {
          line.push('')
        }
      }
      output.push(line)
    }

    // modification by ERIC - just give me the arrays you made out of the object
    if (config.justArrays) {
      return output
    }

    // push the value to a callback if one is defined
    return $.csv.fromArrays(output, options, config.callback)
  }
}

function parseObject (obj, path) {
  let d
  if (path === undefined) {
    path = ''
  }

  const type = typeof obj
  const scalar = (type === 'number' || type === 'string' || type === 'boolean' || type === 'null')

  if (Array.isArray(obj) || type === 'object') {
    d = {}
    for (const i in obj) {
      const newD = parseObject(obj[i], path + i + '/')
      Object.assign(d, newD)
    }

    return d
  } else if (scalar) {
    d = {}
    const endPath = path.substr(0, path.length - 1)
    d[endPath] = obj
    return d
  } else {
    return {}
  }
}

// otherwise, just find the first one
function arrayFrom (json) {
  const queue = []
  let next = json
  while (next !== undefined) {
    if (Array.isArray(next)) {
      return next
    }
    if (typeof next === 'object') {
      for (const key in next) {
        queue.push(next[key])
      }
    }
    next = queue.shift()
  }
  // none found, consider the whole object a row
  return [json]
}
