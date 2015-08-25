
import Cycle from "@cycle/core"
import { h, makeDOMDriver } from "@cycle/dom"
import { makeHTTPDriver } from "@cycle/http"

function main(responses) {

  let click$ = responses.DOM.get(".get-random", "click")

  const USERS_URL = "http://jsonplaceholder.typicode.com/users/"

  let getRandomUser$ = click$.map(() => {
    let randomNum = Math.round(Math.Random()*9)+1
    return {
      url: USERS_URL + String(randomNum),
      method: "GET"
    }
  })

  let requests = {
    DOM: responses.DOM.get("input", "change")
      .map(ev => ev.target.checked)
      .startWith(true)
      .map(toggled =>
        h("div", [
          h("input", {type: "checkbox"}), toggled ? "Chur! sweet!" : "toggle me! bro!",
          h("p", toggled ? "ON" : "OFF, bro! turn me back on!")
        ])
      )
  }
  return requests
}

Cycle.run(main, {
  DOM: makeDOMDriver("#app")
})

