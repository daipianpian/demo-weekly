import { Message, MessageBox } from 'element-ui'
import router from '../../router'

const commonFn = {
	toast (str, type, showClose, onCloseFn) {
		let time = 1000
		if (showClose) {
			time = 3000
		}
		Message({
			showClose: showClose,
			message: str,
			type: type,
			duration: time,
			onClose: onCloseFn
		})
	},
	// 刷新当前页面
	shallowRefresh (name) {
		console.log('shallowRefresh name=' + name)
		router.replace({
			path: '/refresh',
			query: {
				name: name
			}
		})
	},
	// 弹框
	msgBox (type, title, message, confirm, cancel) {
		switch (type) {
			case 'alert':
				MessageBox.alert(message, title, {
						dangerouslyUseHTMLString: true
					})
					.then(() => {
						// 点击确定
					})
					.catch(action => {
						// 点击取消
					})
				break
			case 'confirm':
				MessageBox.confirm(message, title, {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					cancelButtonClass: 'messagebox-cancel-button',
					dangerouslyUseHTMLString: true,
					type: 'warning'
				}).then(() => {
					if (!confirm) {
						Message({
							message: title + '失败!',
							type: 'success',
							duration: 1500
						})
					} else {
						confirm()
					}
				}).catch(() => {
					if (!cancel) {
						Message({
							message: '已取消' + title,
							type: 'info',
							duration: 1500
						})
					} else {
						cancel()
					}
				})
				break
		}
	}
}

export default commonFn
