module.exports = (wait) => async (inputs, asyncFunction) => {
  const result = []
  for (let i = 0; i < inputs.length; ++i) {
    const asyncResult = await asyncFunction(inputs[i])
    if (asyncResult) result.push(asyncResult)
    await wait()
  }
  return result
}
