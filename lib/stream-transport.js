import { PK, getLogger, prepareMessageForSending, resolveStream } from './shared.js';

/**
 * 创建一个输出内容是 流(Stream) 或 完整 Buffer的邮件内容的传输对象
 * 适用于需要将邮件内容直接输出到控制台、文件或其他流接口的场景;
 * 该传输对象不会实际发送邮件,而是将邮件内容以流或缓冲区的形式提供给调用者;
 * >查看定义:@see {@link StreamTransport}
 * @param {Object} [options] 配置选项
 * @param {boolean} [options.buffer=false]
 *   - `false`（默认）：**异步流式返回**，邮件内容以可读流 (Readable Stream) 的形式给出。
 *     适合：需要实时推送、管道转发，或邮件体积很大不想一次全装进内存时。
 *   - `true`：**先收完整再返回**，邮件内容会被拼成一个 Buffer 对象一次性给你。
 *     适合：需要加密、签名、保存文件等必须先拿到完整内容的场景。
 * @param {string} [options.newline='']
 *   生成的邮件正文使用哪种换行符：
 *   - `'windows'`, `'win'`, `'dos'` 或 `'\r\n'` → 使用 Windows 风格换行 `\r\n`
 *   - `'unix'`、空字符串或其他值 → 使用 Unix 风格换行 `\n`
 *   通常保持默认即可；只有当你明确知道邮件客户端在 Windows 上有换行问题时才需设置。
 *
 * @constructor
 */
class StreamTransport {
    constructor(options = {}) {
        this.options = options, this.name = 'StreamTransport', this.version = PK.version;

        const { component = 'streamTransport', newline = '' } = this.options;
        this.logger = getLogger(this.options, { component });                                         // 初始化日志记录器
        this.winbreak = ['win', 'windows', 'dos', '\r\n'].includes(newline.toString().toLowerCase()); // 根据配置确定换行符类型
    }

    /**
     * 编译 mailcomposer 消息并将其转发给发送处理器
     *
     * @param {Object} emailMessage MailComposer 对象
     * @param {Function} callback 发送完成时运行的回调函数
     */
    send(mail, done) {
        const { envelope, messageId, readStream } // 邮件预处理
            = prepareMessageForSending(mail, this.logger, '', { transportType: 'stream', winbreak: this.winbreak });

        // 使用 setImmediate 确保异步执行
        setImmediate(() => {
            const handleError = (err, context) => {
                this.logger.error({ err, tnx: 'send', messageId }, context, messageId, err.message), done(err);
            };

            // 如果不使用缓冲区，直接返回流(流可读时才认为成功)
            if (!this.options.buffer) {
                readStream.once('readable', () => done(null, { envelope, messageId, message: readStream }))
                    .once('error', err => handleError(err, '为 %s 创建消息流失败。%s'))
            }

            // 将流数据读取到Buffer中
            resolveStream(readStream, (err, value) => err ? handleError(err) : done(null, { envelope, messageId, message: value }));
        });
    }
}

export { StreamTransport };