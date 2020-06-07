import { Message } from 'view-design'

/* 成功提示 */
export function msgSuc (info) {
  Message.success({
    top: 50,
    content: info,
    duration: 2,
    background: false
  })
}

/* 失败提示 */
export function msgError (info) {
  Message.error({
    top: 50,
    content: info,
    duration: 2,
    background: false
  })
}

/* 警告提示 */
export function msgW (info) {
  Message.error({
    top: 50,
    content: info,
    duration: 2,
    background: false
  })
}

export default  {
  msgSuc,
  msgError,
  msgW
}