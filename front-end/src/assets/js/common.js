import { Message } from 'element-ui'

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
				bus.$alert(message, title, {
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
				bus.$confirm(message, title, {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					cancelButtonClass: 'messagebox-cancel-button',
					dangerouslyUseHTMLString: true,
					type: 'warning'
				}).then(() => {
					if (!confirm) {
						bus.$message({
							type: 'success',
							message: title + '失败!',
							duration: 1500
						})
					} else {
						confirm()
					}
				}).catch(() => {
					if (!cancel) {
						bus.$message({
							type: 'info',
							message: '已取消' + title,
							duration: 1500
						})
					} else {
						cancel()
					}
				})
				break
		}
	},
	// 去除两端的空白
	trim(text) {
		const rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
		return text == null ? null : (text + '').replace(rtrim, '')
	}
}


export default commonFn
