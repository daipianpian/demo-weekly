import * as types from './mutation-types'

export default {
	[types.CHANGE_IS_BILL] (state, bill) {
		state.isBill = bill;
	}
};
