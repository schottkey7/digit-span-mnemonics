// @flow

import test from "ava";

import * as actions from "../src/actions";
import * as actionTypes from "../src/constants/actionTypes";

test("changeMode action test", t => {
  const mode = "learn";
  const expected = {
    type: actionTypes.CHANGE_MODE,
    payload: {mode},
  };

  t.deepEqual(actions.changeMode({mode}), expected);
});
