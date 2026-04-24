import { DKIM } from './lib/dkim/index.js';
import { MessageParser } from './lib/dkim/message-parser.js';
import { RelaxedBody } from './lib/dkim/relaxed-body.js';
import { generateDKIMSignature } from './lib/dkim/sign.js';
import { Cookies } from './lib/fetch/cookies.js';
import { nmfetch } from './lib/fetch/index.js';
import { Mailer } from './lib/mailer/index.js';
import { MailMessage } from './lib/mailer/mail-message.js';
import {
    isPlainText, hasLongerLines, encodeWord, encodeWords, buildHeaderValue, parseHeaderValue, detectExtension,
    detectMimeType, foldLines
} from './lib/mime-funcs/index.js';
import { MIME_TYPES, EXTENSIONS } from './lib/mime-funcs/mime-types.js';
import { MimeNode } from './lib/mime-node/index.js';
import { LastNewline } from './lib/mime-node/last-newline.js';
import { LeUnix } from './lib/mime-node/le-unix.js';
import { LeWindows } from './lib/mime-node/le-windows.js';
import { DataStream } from './lib/smtp-connection/data-stream.js';
import { SmtpConnection } from './lib/smtp-connection/index.js';
import { SmtpPool } from './lib/smtp-pool/index.js';
import { PoolResource } from './lib/smtp-pool/pool-resource.js';
import { wellKnown } from './lib/well-known/index.js';
import { addressparser } from './lib/addressparser.js';
import { base64Encode, Base64Encoder } from './lib/base64.js';
import { httpProxyClient } from './lib/http-proxy-client.js';
import { JsonTransport } from './lib/json-transport.js';
import { MailComposer } from './lib/mail-composer.js';
import { toASCII } from './lib/punycode.js';
import { qpEncode, QpEncoder } from './lib/qp.js';
import { regexs, resetRegex } from './lib/regexs.js';
import { SendmailTransport } from './lib/sendmail-transport.js';
import { SesTransport } from './lib/ses-transport.js';
import {
    PK, regexs, resetRegex, dnsLookup, dnsResolve, format, isIP, netConnect, fsReadStream, osHostname, nmfetch, newURL,
    resolveHostname, parseConnectionUrl, getLogger, callbackPromise, parseDataURI, resolveContent, resolveStream, assign,
    encodeXText, initSmtpConstructor, getSocket, cleanup, createSmtpConnection, setupConnectionHandlers,
    performSmtpAuthentication, createAuthConfig, prepareMessageForSending, handleSendResult, verifySmtp
} from './lib/shared.js';
import { 填充模_ } from './填充模.js';

// =================================== lib/dkim/index.js ===================================
/**
 * ```js
 * // 文件导出内容
 * class DKIM{}; // DomainKeys Identified Mail 签名处理类
 * ```
 * >查看定义:@see {@link DKIM}
 */
declare module './lib/dkim/index.js' {
    export * from './lib/dkim/index.js';
}

// =================================== lib/dkim/message-parser.js ===================================
/**
 * ```js
 * // 文件导出内容
 * class MessageParser{}; // 该类实例是一个转换流,用于将消息头与消息体分离;
 * ```
 * >查看定义:@see {@link MessageParser}
 */
declare module './lib/dkim/message-parser.js' {
    export * from './lib/dkim/message-parser.js';
}

// =================================== lib/dkim/relaxed-body.js ===================================
/**
 * ```js
 * // 文件导出内容
 * class RelaxedBody{}; // 宽松规范化邮件正文的转换流,实现DKIM签名中的relaxed body canonicalization
 * ```
 * >查看定义:@see {@link RelaxedBody}
 */
declare module './lib/dkim/relaxed-body.js' {
    export * from './lib/dkim/relaxed-body.js';
}

// =================================== lib/dkim/sign.js ===================================
/**
 * ```js
 * // 文件导出内容
 * generateDKIMSignature(); // 生成DKIM签名头行
 * ```
 * >查看定义:@see {@link generateDKIMSignature}
 */
declare module './lib/dkim/sign.js' {
    export * from './lib/dkim/sign.js';
}

// =================================== lib/fetch/cookies.js ===================================
/**
 * ```js
 * // 文件导出内容
 * class Cookies{}; // 创建一个Biskviit Cookie存储容器,用于内存中的Cookie管理
 * ```
 * >查看定义:@see {@link Cookies}
 */
declare module './lib/fetch/cookies.js' {
    export * from './lib/fetch/cookies.js';
}

// =================================== lib/fetch/index.js ===================================
/**
 * ```js
 * // 文件导出内容
 * nmfetch(); // 执行 HTTP/HTTPS 请求,支持重定向、Cookie管理、请求体处理、响应解压等功能;
 * ```
 * >查看定义:@see {@link nmfetch}
 */
declare module './lib/fetch/index.js' {
    export * from './lib/fetch/index.js';
}

// =================================== lib/mailer/index.js ===================================
/**
 * ```js
 * // 文件导出内容
 * class Mailer{}; // 创建 Mail API 对象
 * ```
 * >查看定义:@see {@link Mailer}
 */
declare module './lib/mailer/index.js' {
    export * from './lib/mailer/index.js';
}

// =================================== lib/mailer/mail-message.js ===================================
/**
 * ```js
 * // 文件导出内容
 * class MailMessage{}; // 负责构建和处理邮件消息对象
 * ```
 * >查看定义:@see {@link MailMessage}
 */
declare module './lib/mailer/mail-message.js' {
    export * from './lib/mailer/mail-message.js';
}

// =================================== lib/mime-funcs/index.js ===================================
/**
 * ```js
 * // 文件导出内容
 * isPlainText();      // 检查值是否为纯文本字符串;
 * hasLongerLines();   // 检查多行字符串是否包含超过指定长度的行;
 * encodeWord();       // 将字符串或Buffer编码为UTF-8 MIME字(rfc2047);
 * encodeWords();      // 查找包含非ASCII文本的单词序列并将其转换为MIME字;
 * buildHeaderValue(); // 将解析后的头值连接为 'value; param1=value1; param2=value2';
 * parseHeaderValue(); // 将带有key=value参数的头值解析为结构化对;
 * detectExtension();  // 根据MIME类型检测文件扩展名;
 * detectMimeType();   // 根据文件名检测MIME类型;
 * foldLines();        // 折叠长行,适用于折叠头行(afterSpace=false)和流文本(afterSpace=true);
 * ```
 * >查看定义:@see {@link isPlainText}、{@link hasLongerLines}、{@link encodeWord}、{@link encodeWords}、{@link buildHeaderValue}、
 * {@link parseHeaderValue}、{@link detectExtension}、{@link detectMimeType}、{@link foldLines}
 */
declare module './lib/mime-funcs/index.js' {
    export * from './lib/mime-funcs/index.js';
}

// =================================== lib/mime-funcs/mime-types.js ===================================
/**
 * ```js
 * // 文件导出内容(MIME类型和文件扩展名的互转映射表)
 * const MIME_TYPES = new Map([]), EXTENSIONS = new Map([]);
 * ```
 * >查看定义:@see {@link MIME_TYPES}、{@link EXTENSIONS}
 */
declare module './lib/mime-funcs/mime-types.js' {
    export * from './lib/mime-funcs/mime-types.js';
}

// =================================== lib/mime-node/index.js ===================================
/**
 * ```js
 * // 文件导出内容
 * class MimeNode{}; // 创建一个新的MIME树节点;
 * ```
 * >查看定义:@see {@link MimeNode}
 */
declare module './lib/mime-node/index.js' {
    export * from './lib/mime-node/index.js';
}

// =================================== lib/mime-node/last-newline.js ===================================
/**
 * ```js
 * // 文件导出内容
 * class LastNewline{}; // 一个转换流,用于确保数据以正确的换行符结束;
 * ```
 * >查看定义:@see {@link LastNewline}
 */
declare module './lib/mime-node/last-newline.js' {
    export * from './lib/mime-node/last-newline.js';
}

// =================================== lib/mime-node/le-unix.js ===================================
/**
 * ```js
 * // 文件导出内容
 * class LeUnix{}; // 确保仅使用 `<LF>` 作为换行符(Windows风格处理);
 * ```
 * >查看定义:@see {@link LeUnix}
 */
declare module './lib/mime-node/le-unix.js' {
    export * from './lib/mime-node/le-unix.js';
}

// =================================== lib/mime-node/le-windows.js ===================================
/**
 * ```js
 * // 文件导出内容
 * class LeWindows(); // 确保只使用 `<CR><LF>` 序列作为换行符(Windows风格处理)
 * ```
 * >查看定义:@see {@link LeWindows}
 */
declare module './lib/mime-node/le-windows.js' {
    export * from './lib/mime-node/le-windows.js';
}

// =================================== lib/smtp-connection/data-stream.js ===================================
/**
 * ```js
 * // 文件导出内容
 * class DataStream(); // 转义行首的点,以`<CR><LF>.<CR><LF>`结束流;
 * ```
 * >查看定义:@see {@link DataStream}
 */
declare module './lib/smtp-connection/data-stream.js' {
    export * from './lib/smtp-connection/data-stream.js';
}

// =================================== lib/smtp-connection/index.js ===================================
/**
 * ```js
 * // 文件导出内容
 * class SmtpConnection{}; // 生成SMTP连接对象;
 * ```
 * >查看定义:@see {@link SmtpConnection}
 */
declare module './lib/smtp-connection/index.js' {
    export * from './lib/smtp-connection/index.js';
}

// =================================== lib/smtp-pool/index.js ===================================
/**
 * ```js
 * // 文件导出内容
 * class SmtpPool{}; // 为 flun-mail 创建 SMTP 连接池传输对象;
 * ```
 * >查看定义:@see {@link SmtpPool}
 */
declare module './lib/smtp-pool/index.js' {
    export * from './lib/smtp-pool/index.js';
}

// =================================== lib/smtp-pool/pool-resource.js ===================================
/**
 * ```js
 * // 文件导出内容
 * class PoolResource{}; // 为连接池创建资源元素;
 * ```
 * >查看定义:@see {@link PoolResource}
 */
declare module './lib/smtp-pool/pool-resource.js' {
    export * from './lib/smtp-pool/pool-resource.js';
}

// =================================== lib/well-known/index.js ===================================
/**
 * ```js
 * // 文件导出内容
 * wellKnown(); // 根据提供的键名解析 SMTP 配置;
 * ```
 * >查看定义:@see {@link wellKnown}
 */
declare module './lib/well-known/index.js' {
    export * from './lib/well-known/index.js';
}

// =================================== lib/addressparser.js ===================================
/**
 * ```js
 * // 文件导出内容
 * addressparser(); // 解析地址字段字符串为结构化的电子邮件地址对象数组
 * ```
 * >查看定义:@see {@link addressparser}
 */
declare module './lib/addressparser.js' {
    export * from './lib/addressparser.js';
}

// =================================== lib/base64.js ===================================
/**
 * ```js
 * // 文件导出内容
 * base64Encode();        // 将Buffer编码为base64字符串
 * class Base64Encoder{}; // 创建用于将数据编码为base64的转换流
 * ```
 * >查看定义:@see {@link base64Encode}、{@link Base64Encoder}
 */
declare module './lib/base64.js' {
    export * from './lib/base64.js';
}

// =================================== lib/http-proxy-client.js ===================================
/**
 * ```js
 * // 文件导出内容
 * httpProxyClient(); // 建立到目标端口的代理连接
 * ```
 * >查看定义:@see {@link httpProxyClient}
 */
declare module './lib/http-proxy-client.js' {
    export * from './lib/http-proxy-client.js';
}

// =================================== lib/json-transport.js ===================================
/**
 * ```js
 * // 文件导出内容
 * class JsonTransport{}; // 生成用于输出JSON的传输对象
 * ```
 * >查看定义:@see {@link JsonTransport}
 */
declare module './lib/json-transport.js' {
    export * from './lib/json-transport.js';
}

// =================================== lib/mail-composer.js ===================================
/**
 * ```js
 * // 文件导出内容
 * class MailComposer{}; // 邮件编译器类,用于从邮件选项组合MimeNode实例;
 * ```
 * >查看定义:@see {@link MailComposer}
 */
declare module './lib/mail-composer.js' {
    export * from './lib/mail-composer.js';
}

// =================================== lib/punycode.js ===================================
/**
 * ```js
 * // 文件导出内容
 * toASCII(); // 将表示域名或电子邮件地址的Unicode字符串转换为Punycode
 * ```
 * >查看定义:@see {@link toASCII}
 */
declare module './lib/punycode.js' {
    export * from './lib/punycode.js';
}

// =================================== lib/qp.js ===================================
/**
 * ```js
 * // 文件导出内容
 * qpEncode();        // 将Buffer编码为Quoted-Printable格式的字符串
 * class QpEncoder{}; // 创建用于将数据编码为Quoted-Printable格式的转换流
 * ```
 * >查看定义:@see {@link qpEncode}、{@link QpEncoder}
 */
declare module './lib/qp.js' {
    export * from './lib/qp.js';
}

// =================================== lib/regexs.js ===================================
/**
 * ```js
 * // 文件导出内容
 * const regexs = {} // 正则表达式常量对象
 * resetRegex();     // 重置正则表达式的lastIndex属性
 * ```
 * >查看定义:@see {@link regexs}、{@link resetRegex}
 */
declare module './lib/regexs.js' {
    export * from './lib/regexs.js';
}

// =================================== lib/sendmail-transport.js ===================================
/**
 * ```js
 * // 文件导出内容
 * class SendmailTransport{}; // 生成Sendmail传输对象
 * ```
 * >查看定义:@see {@link SendmailTransport}
 */
declare module './lib/sendmail-transport.js' {
    export * from './lib/sendmail-transport.js';
}

// =================================== lib/ses-transport.js ===================================
/**
 * ```js
 * // 文件导出内容
 * SesTransport(); // 生成用于 AWS SES 的传输对象
 * ```
 * >查看定义:@see {@link SesTransport}
 */
declare module './lib/ses-transport.js' {
    export * from './lib/ses-transport.js';
}

// =================================== lib/shared.js ===================================
/**
 * ```js
 * // 文件导出内容
 * const PK={};                 // package.json 包对象(含 name,,version,,homepage);
 * const regexs={};             // 常用正则表达式集合;
 * resetRegex();                // 重置正则表达式（清除 lastIndex）;
 * dnsLookup();                 // dns.lookup 的引用;
 * dnsResolve();                // dns.resolve 的引用;
 * format();                    // util.format 的引用;
 * isIP();                      // 检查字符串是否为 IP 地址（v4 或 v6）;
 * netConnect();                // net.connect 的引用;
 * fsReadStream();              // fs.createReadStream 的引用;
 * osHostname();                // os.hostname 的引用;
 * nmfetch();                   // 自定义 fetch 实现;
 * newURL();                    // 安全地创建 URL 对象;
 * resolveHostname();           // 解析主机名，支持 DNS 缓存与 IPv4/IPv6;
 * parseConnectionUrl();        // 解析连接 URL 为配置对象;
 * getLogger();                 // 创建 bunyan 兼容的日志记录器;
 * callbackPromise();           // 创建 Promise 回调包装器（resolve, reject）;
 * parseDataURI();              // 解析 Data URI 字符串;
 * resolveContent();            // 解析字符串或 Buffer 值的内容;
 * resolveStream();             // 将可读流完整读取到 Buffer 中;
 * assign();                    // 合并对象属性（深度合并 tls 与 auth）;
 * encodeXText();               // XText 编码（SMTP 扩展）;
 * initSmtpConstructor();       // 初始化 SMTP 传输对象的公共构造函数逻辑;
 * getSocket();                 // 获取代理套接字的占位函数;
 * cleanup();                   // 用于清理状态对象;
 * createSmtpConnection();      // 创建并配置 SMTP 连接;
 * setupConnectionHandlers();   // 处理连接错误与结束事件通用函数;
 * performSmtpAuthentication(); // 执行 SMTP 认证的通用逻辑;
 * createAuthConfig();          // 创建认证配置对象;
 * prepareMessageForSending();  // 发送邮件前的通用预处理;
 * handleSendResult();          // 处理发送结果的通用逻辑;
 * verifySmtp();                // 验证 SMTP 配置的通用函数;
 * ```
 * >查看定义:@see {@link PK}、{@link regexs}、{@link resetRegex}、{@link dnsLookup}、{@link dnsResolve}、{@link format}、
 * {@link isIP}、{@link netConnect}、{@link fsReadStream}、{@link osHostname}、{@link nmfetch}、
 * {@link newURL}、{@link resolveHostname}、
 * {@link parseConnectionUrl}、{@link getLogger}、{@link callbackPromise}、
 * {@link parseDataURI}、{@link resolveContent}、{@link resolveStream}、
 * {@link assign}、{@link encodeXText}、{@link initSmtpConstructor}、
 * {@link getSocket}、{@link cleanup}、{@link createSmtpConnection}、
 * {@link setupConnectionHandlers}、{@link performSmtpAuthentication}、
 * {@link createAuthConfig}、{@link prepareMessageForSending}、
 * {@link handleSendResult}、{@link verifySmtp}
 */
declare module './lib/shared.js' {
    export * from './lib/shared.js';
}

/**
 * 邮件发送模块 主要功能：
 * ```js
 * createTransport();   // 创建邮件传输器
 * validateConfig();    // 验证配置
 * ```
 * ---
 * >
 * ```js
 *  // 发送邮件示例
 *  import { createTransport } from 'flun-mail';
 *  import { env } from 'flun-env'; // 注意:flun-env需自行安装
 *
 *  // 请根据您的邮箱服务商修改以下配置
 *  transporter = createTransport({
 *      host: 'smtp.189.cn',  // 邮箱服务商SMTP服务器地址
 *      port: 465,            // 端口号
 *      secure: true,         // 是否使用SSL/TLS
 *      // 认证信息
 *      auth: {
 *          user: 'abc@189.cn', // 你的邮箱地址
 *          pass: env.MAIL_PWD  // 邮箱密码
 *      }
 *  });
 *
 *  // 发送
 *  transporter.sendMail({
 *      from: 'abc@189.cn',        // 发件人
 *      to: 'xyz@189.cn',          // 收件人
 *      subject: '测试邮件',        // 邮件主题
 *      text: '纯文本测试',         // 纯文本内容
 *      html: '<b>html格式测试</b>' // HTML内容（可选;注:html内容优先级高于纯文本内容）
 *  }, (error, info) => {
 *      if (error) console.error('发送失败:', error);
 *      else console.log('发送成功:', info.response);
 *  });
 * ```
 * ---
 * >查看定义:@see {@link createTransport}、{@link validateConfig}
 */
declare module './index.js' {
    // ==================== 模块依赖 ====================
    import { EventEmitter } from 'events';

    // ==================== 核心导出函数 ====================

    /**
     * 创建邮件传输器
     *
     * 根据配置自动选择合适的传输器类型：
     * - 启用连接池: pool=true -> SmtpPool
     * - 启用sendmail: sendmail=true或字符串 -> SendmailTransport
     * - 启用流传输: streamTransport=true -> StreamTransport
     * - 启用JSON传输: jsonTransport=true -> JsonTransport
     * - 配置SES: SES对象存在 -> SesTransport
     * - 默认: 标准SMTP传输器
     *
     * @param transporter 传输器配置对象、连接URL字符串或已创建的传输器实例
     * @param defaults 默认邮件选项
     * @returns Mailer实例
     *
     * @example
     * ```javascript
     * // SMTP传输器
     * const smtpTransporter = createTransport({
     *     host: 'smtp.example.com',
     *     port: 465,
     *     secure: true,
     *     auth: {
     *         user: 'user@example.com',
     *         pass: 'password'
     *     }
     * });
     *
     * // 连接URL方式
     * const urlTransporter = createTransport('smtps://user:pass@smtp.example.com:465');
     * ```
     */
    export function createTransport(transporter: TransportConfig, defaults?: MailData): Mailer;

    /**
     * 验证邮件配置
     *
     * 验证传入的配置对象是否有效，返回包含验证状态、错误和警告信息的对象
     *
     * @param config 要验证的配置对象或URL字符串
     * @returns 验证结果对象
     *
     * @example
     * ```javascript
     * const result = validateConfig({
     *     host: 'smtp.example.com',
     *     port: 465,
     *     auth: { user: 'test@example.com' }
     * });
     *
     * if (result.valid) {
     *     console.log('配置有效');
     * } else {
     *     console.error('配置错误:', result.errors);
     * }
     * ```
     */
    export function validateConfig(config: any): ValidationResult;

    // ==================== 通用类型定义 ====================

    /**
     * 传输器配置类型
     * 可以是：连接URL字符串、具体的配置对象或已创建的传输器实例
     */
    export type TransportConfig = string | SpecificTransportConfig | Transporter;

    /**
     * 所有具体传输器配置的联合类型
     * 用于区分不同类型的传输器配置
     */
    export type SpecificTransportConfig = | SmtpConfig | SmtpPoolConfig | SendmailConfig | StreamTransportConfig
        | JsonTransportConfig | SesTransportConfig;

    /**
     * 传输器接口
     */
    export interface Transporter {
        /** 发送邮件方法 */
        send(mail: MailMessage, callback: (err: Error | null, info: SentMessageInfo) => void): void;
        /** 事件监听方法 */
        on(event: string, listener: (...args: any[]) => void): this;
        /** 关闭连接方法 */
        close?(): void | Promise<void>;
        /** 检查是否空闲 */
        isIdle?(): boolean;
        /** 验证连接 */
        verify?(callback?: (error: Error | null, success?: boolean) => void): void | Promise<boolean>;
        /** 传输器名称 */
        name?: string;
        /** 传输器版本 */
        version?: string;
        /** 关联的Mail实例 */
        mailer?: Mailer;
        /** 配置选项 */
        options?: SpecificTransportConfig;
        /** 日志记录器 */
        logger?: Logger;
    }

    /**
     * 邮件发送结果
     */
    export interface SentMessageInfo {
        /** 消息ID */
        messageId: string;
        /** 响应消息 */
        message?: string | object;
        /** 原始响应 */
        response?: string;
        /** 收件人列表 */
        accepted?: string[];
        /** 被拒绝的收件人列表 */
        rejected?: string[];
        /** 等待的收件人列表 */
        pending?: string[];
        /** 信封信息 */
        envelope?: {
            from: string;
            to: string[];
        };
    }

    /**
     * 配置验证结果
     */
    export interface ValidationResult {
        /** 验证是否通过 */
        valid: boolean;
        /** 错误信息列表 */
        errors: string[];
        /** 警告信息列表 */
        warnings?: string[];
    }

    // ==================== 核心类定义 ====================

    /**
     * 邮件主类
     *
     * 邮件发送的核心类,管理传输器实例并提供邮件发送功能
     */
    export class Mailer {
        constructor(transporter: Transporter, options?: SpecificTransportConfig, defaults?: MailData);

        /** 选项配置 */
        options: SpecificTransportConfig;
        /** 默认配置 */
        _defaults: MailData;
        /** 传输器实例 */
        transporter: Transporter;
        /** 日志记录器 */
        logger: Logger;
        /** DKIM实例 */
        dkim: DKIM;
        /** 元数据存储 */
        meta: Map<string, any>;

        /**
         * 发送邮件
         * @param data 邮件数据
         * @param callback 回调函数（可选）
         * @returns Promise<SentMessageInfo>
         */
        sendMail(data: MailData, callback?: (err: Error | null, info: SentMessageInfo) => void): Promise<SentMessageInfo>;

        /** 使用插件 */
        use(step: 'compile' | 'stream', plugin: (mail: MailMessage, callback: (err?: Error) => void) => void): this;
        /** 获取版本字符串 */
        getVersionString(): string;
        /** 设置代理 */
        setupProxy(proxyUrl: string): void;
        /** 设置元数据 */
        set(key: string, value: any): this;
        /** 获取元数据 */
        get(key: string): any;
        /** 关闭传输器 */
        close(): void | boolean | Promise<void>;
        /** 检查是否空闲 */
        isIdle(): boolean;
        /** 验证传输器 */
        verify(): void | boolean | Promise<boolean>;
    }

    /**
     * 邮件消息类
     */
    export class MailMessage {
        constructor(mailer: Mailer, data: MailData);
        /** 邮件数据 */
        data: MailData;
        /** 邮件消息对象 */
        message: MailComposer;
        /** 设置邮件头 */
        setMailerHeader(): void;
        /** 设置优先级头 */
        setPriorityHeaders(): void;
        /** 设置列表头 */
        setListHeaders(): void;
        /** 解析内容 */
        resolveContent(obj: any, key: string, callback: (err: Error | null, content: any) => void): void;
    }

    /**
     * 邮件组合器类
     */
    export class MailComposer {
        constructor(data: MailData);
        /** 编译邮件 */
        compile(): MailComposer;
        /** 处理函数 */
        processFunc(handler: (input: any) => any): void;
        /** 获取消息ID */
        messageId(): string;
    }

    /**
     * DKIM类
     */
    export class DKIM {
        constructor(options: DKIMOptions);
        /** 签名 */
        sign(input: any): any;
        /** 密钥列表 */
        keys: DKIMKey[];
    }

    // ==================== 邮件数据相关接口 ====================

    /**
     * 邮件数据接口
     */
    export interface MailData {
        /** 发件人 */
        from?: string;
        /** 收件人 */
        to?: string | string[];
        /** 抄送 */
        cc?: string | string[];
        /** 密送 */
        bcc?: string | string[];
        /** 回复地址 */
        replyTo?: string | string[];
        /** 主题 */
        subject?: string;
        /** 纯文本内容 */
        text?: string;
        /** HTML内容 */
        html?: string;
        /** 附件 */
        attachments?: Attachment[];
        /** DKIM配置 */
        dkim?: DKIMOptions;
        /** 是否附加数据URL图片 */
        attachDataUrls?: boolean;
        /** 优先级 */
        priority?: 'high' | 'normal' | 'low';
        /** 邮件头 */
        headers?: Record<string, string | string[]>;
        /** 消息ID */
        messageId?: string;
    }

    /**
     * 附件接口
     */
    export interface Attachment {
        /** 文件路径 */
        path?: string;
        /** 内容ID（用于内联附件） */
        cid?: string;
        /** 文件名 */
        filename?: string;
        /** 文件内容 */
        content?: string | Buffer;
        /** 内容类型 */
        contentType?: string;
        /** 编码 */
        encoding?: string;
    }

    // ==================== 基础配置接口 ====================

    /**
     * 基础传输器配置
     * 包含所有传输器通用的配置选项
     */
    export interface BaseTransportConfig {
        /** 连接URL（优先级高于其他配置） */
        url?: string;
        /** 代理配置 */
        proxy?: string;
        /** 日志配置 */
        logger?: boolean | LoggerOptions;
        /** 组件名称（用于日志记录） */
        component?: string;
    }

    /**
     * 认证选项
     */
    export interface AuthOptions {
        /** 用户名(邮箱地址) */
        user: string;
        /** 密码(邮箱密码) */
        pass?: string;
        /** OAuth2配置 */
        oauth2?: object;
        /** XOAuth2配置 */
        xoauth2?: object;
    }

    /**
     * DKIM配置选项
     */
    export interface DKIMOptions {
        /** 域名 */
        domainName?: string;
        /** 密钥选择器 */
        keySelector?: string;
        /** 私钥 */
        privateKey?: string;
        /** DKIM密钥列表 */
        keys?: DKIMKey[];
    }

    /**
     * DKIM密钥
     */
    export interface DKIMKey {
        /** 密钥选择器 */
        keySelector: string;
        /** 域名 */
        domainName: string;
    }

    /**
     * 日志配置选项
     */
    export interface LoggerOptions {
        /** 日志级别 */
        level?: string;
        /** 组件名称 */
        component?: string;
    }

    /**
     * 认证配置结果类型
     */
    export type AuthConfig = '' | {
        /** 认证类型 */
        type: string;
        /** 用户邮箱 */
        user: string;
        /** 认证方法 */
        method?: string;
        /** OAuth2实例 */
        oauth2?: EventEmitter & {
            provisionCallback?: Function;
            removeAllListeners?: () => void;
        };
        /** 凭证信息 */
        credentials?: {
            user: string;
            pass?: string;
            options?: any;
        };
    };

    /**
     * 日志记录器接口
     */
    export interface Logger {
        debug(meta: object, message: string, ...args: any[]): void;
        info(meta: object, message: string, ...args: any[]): void;
        warn(meta: object, message: string, ...args: any[]): void;
        error(meta: object, message: string, ...args: any[]): void;
    }

    // ==================== SMTP传输器配置 ====================
    // 用于标准SMTP邮件发送，适用于大多数邮件服务商

    /**
     * SMTP传输器配置接口
     *
     * @example
     * ```javascript
     * // 基本SMTP配置
     * {
     *     host: 'smtp.189.cn',
     *     port: 465,
     *     secure: true,
     *     auth: {
     *         user: 'abc@189.cn',
     *         pass: 'password'
     *     }
     * }
     * ```
     */
    export interface SmtpConfig extends BaseTransportConfig {
        /** 主机地址(SMTP服务器地址) */
        host?: string;
        /** 服务名称(邮箱服务商名称) */
        service?: string;
        /** 端口号(SMTP服务器端口) */
        port?: number;
        /** 是否使用SSL/TLS */
        secure?: boolean;
        /** 认证信息 */
        auth?: AuthOptions;
        /** TLS配置 */
        tls?: object | boolean;
        /** DKIM配置 */
        dkim?: DKIMOptions;
    }

    /**
     * SMTP传输器
     */
    export class SmtpTransport extends EventEmitter implements Transporter {
        constructor(options: SmtpConfig);
        /** 认证配置 */
        auth?: AuthConfig;

        /** 获取认证信息 */
        getAuth(authOpts?: any): AuthConfig;
        /** 发送邮件 */
        send(mail: MailMessage, callback: (err: Error | null, info: SentMessageInfo) => void): void;
        /** 事件监听方法 */
        on(event: string, listener: (...args: any[]) => void): this;
        /** 关闭连接方法 */
        close?(): void | Promise<void>;
        /** 检查是否空闲 */
        isIdle?(): boolean;
        /** 验证连接 */
        verify(callback: (error: Error | null, success?: boolean) => void): void;
        /** 传输器名称 */
        name: string;
        /** 版本号 */
        version: string;
        /** 选项配置 */
        options: SmtpConfig;
        /** 日志记录器 */
        logger?: Logger;
        /** 关联的Mail实例 */
        mailer?: Mailer;
    }

    // ==================== SMTP连接池传输器配置 ====================
    // 用于高并发邮件发送，支持连接复用

    /**
     * SMTP连接池配置接口
     *
     * @example
     * ```javascript
     * // SMTP连接池配置
     * {
     *     pool: true,
     *     host: 'smtp.example.com',
     *     port: 465,
     *     secure: true,
     *     auth: { user: 'user@example.com', pass: 'password' },
     *     maxConnections: 5,
     *     maxMessages: 100
     * }
     * ```
     */
    export interface SmtpPoolConfig extends SmtpConfig {
        /** 启用连接池 */
        pool: true;
        /** 最大连接数 */
        maxConnections?: number;
        /** 每个连接最大邮件数 */
        maxMessages?: number;
    }

    /**
     * SMTP连接池传输器
     */
    export class SmtpPool extends EventEmitter implements Transporter {
        constructor(options: SmtpPoolConfig);
        /** 发送邮件 */
        send(mail: MailMessage, callback: (err: Error | null, info: SentMessageInfo) => void): void;
        /** 事件监听方法 */
        on(event: string, listener: (...args: any[]) => void): this;
        /** 关闭连接方法 */
        close?(): void | Promise<void>;
        /** 检查是否空闲 */
        isIdle?(): boolean;
        /** 验证连接 */
        verify(callback?: (error: Error | null, success?: boolean) => void): void | Promise<boolean>;
        /** 传输器名称 */
        name: string;
        /** 版本号 */
        version: string;
        /** 日志记录器 */
        logger: Logger;
        /** 选项配置 */
        options: SmtpPoolConfig;
        /** 关联的Mail实例 */
        mailer?: Mailer;
    }

    // ==================== Sendmail传输器配置 ====================
    // 使用系统sendmail命令发送邮件，适用于Linux/Unix系统

    /**
     * Sendmail传输器配置接口
     *
     * @example
     * ```javascript
     * // Sendmail配置
     * {
     *     sendmail: true,
     *     path: '/usr/sbin/sendmail',
     *     args: ['-t', '-i']
     * }
     * ```
     */
    export interface SendmailConfig extends BaseTransportConfig {
        /** 启用sendmail传输器 */
        sendmail: true | string;
        /** sendmail二进制文件路径 */
        path?: string;
        /** 命令行参数 */
        args?: string[];
        /** 换行符类型 */
        newline?: string;
    }

    /**
     * Sendmail传输器
     */
    export class SendmailTransport implements Transporter {
        constructor(options?: string | SendmailConfig);
        /** 事件监听方法 */
        on(event: string, listener: (...args: any[]) => void): this;
        /** 关闭连接方法 */
        close?(): void | Promise<void>;
        /** 检查是否空闲 */
        isIdle?(): boolean;
        /** 验证连接 */
        verify?(callback?: (error: Error | null, success?: boolean) => void): void | Promise<boolean>;

        /** 发送邮件 */
        send(mail: MailMessage, done: (err: Error | null, info: SentMessageInfo) => void): void;

        /** 传输器名称 */
        name: string;
        /** 版本号 */
        version: string;
        /** 日志记录器 */
        logger: Logger;
        /** 选项配置 */
        options: SendmailConfig;
        /** sendmail路径 */
        path: string;
        /** 命令行参数 */
        args: string[] | false;
        /** 是否使用Windows换行符 */
        winbreak: boolean;
        /** 子进程创建函数 */
        _spawn: typeof import('child_process')['spawn'];
        /** 关联的Mail实例 */
        mailer?: Mailer;

        // 注意：SendmailTransport不实现on、close、isIdle、verify方法
    }

    // ==================== 流传输器配置 ====================
    // 主要用于测试，将邮件输出为流格式

    /**
     * 流传输器配置接口
     *
     * @example
     * ```javascript
     * // 流传输器配置
     * {
     *     streamTransport: true,
     *     buffer: true,
     *     newline: 'unix'
     * }
     * ```
     */
    export interface StreamTransportConfig extends BaseTransportConfig {
        /** 启用流传输 */
        streamTransport: true;
        /** 是否将消息作为Buffer对象 */
        buffer?: boolean;
        /** 换行符类型 */
        newline?: string;
    }

    /**
     * 流传输器
     */
    export class StreamTransport implements Transporter {
        constructor(options: StreamTransportConfig);
        /** 发送邮件 */
        send(mail: MailMessage, callback: (err: Error | null, info: StreamSentMessageInfo) => void): void;
        /** 事件监听方法 */
        on(event: string, listener: (...args: any[]) => void): this;
        /** 关闭连接方法 */
        close?(): void | Promise<void>;
        /** 检查是否空闲 */
        isIdle?(): boolean;
        /** 验证连接 */
        verify?(): void | Promise<boolean>;
        /** 传输器名称 */
        name: string;
        /** 版本号 */
        version: string;
        /** 日志记录器 */
        logger: Logger;
        /** 选项配置 */
        options: StreamTransportConfig;
        /** 是否使用Windows换行符 */
        winbreak: boolean;
        /** 关联的Mail实例 */
        mailer?: Mailer;

        // 注意：StreamTransport不实现on、close、isIdle、verify方法
    }

    /**
     * 流传输器发送结果
     */
    export interface StreamSentMessageInfo extends SentMessageInfo {
        /** 消息内容（根据buffer选项可能是流或缓冲区） */
        message: ReadableStream | Buffer | string;
    }

    // ==================== JSON传输器配置 ====================
    // 用于调试，将邮件转换为JSON格式输出

    /**
     * JSON传输器配置接口
     *
     * @example
     * ```javascript
     * // JSON传输器配置
     * {
     *     jsonTransport: true,
     *     skipEncoding: false
     * }
     * ```
     */
    export interface JsonTransportConfig extends BaseTransportConfig {
        /** 启用JSON传输 */
        jsonTransport: true;
        /** 是否跳过编码 */
        skipEncoding?: boolean;
    }

    /**
     * JSON传输器
     */
    export class JsonTransport implements Transporter {
        constructor(options: JsonTransportConfig);

        /** 发送邮件 */
        send(mail: MailMessage, callback: (err: Error | null, info: JsonSentMessageInfo) => void): void;
        /** 事件监听方法 */
        on(event: string, listener: (...args: any[]) => void): this;
        /** 关闭连接方法 */
        close?(): void | Promise<void>;
        /** 检查是否空闲 */
        isIdle?(): boolean;
        /** 验证连接 */
        verify?(): void | Promise<boolean>;
        /** 传输器名称 */
        name: string;
        /** 版本号 */
        version: string;
        /** 日志记录器 */
        logger: Logger;
        /** 选项配置 */
        options: JsonTransportConfig;
        /** 关联的Mail实例 */
        mailer?: Mailer;

        // 注意：JsonTransport不实现on、close、isIdle、verify方法
    }

    /**
     * JSON传输器发送结果
     */
    export interface JsonSentMessageInfo extends SentMessageInfo {
        /** 消息内容（根据skipEncoding选项可能是JSON字符串或原始数据对象） */
        message: string | object;
    }

    // ==================== SES传输器配置 ====================
    // 用于通过AWS Simple Email Service发送邮件

    /**
     * SES传输器配置接口
     *
     * @example
     * ```javascript
     * // SES传输器配置
     * {
     *     SES: {
     *         sesClient: new SESClient({ region: 'us-east-1' }),
     *         SendEmailCommand: SendEmailCommand
     *     }
     * }
     * ```
     */
    export interface SesTransportConfig extends BaseTransportConfig {
        /** AWS SES客户端配置 */
        SES: {
            /** AWS SES客户端实例 */
            sesClient: any;
            /** SendEmailCommand构造函数 */
            SendEmailCommand: new (data: any) => any;
        };
    }

    /**
     * SES传输器
     */
    export class SesTransport extends EventEmitter implements Transporter {
        constructor(options: SesTransportConfig);

        /**
         * 发送邮件
         */
        send(mail: MailMessage, callback: (err: Error | null, info: SesSentMessageInfo) => void): void;

        /**
         * 验证SES配置
         */
        verify(callback?: (error: Error | null, success?: boolean) => void): Promise<boolean> | void;

        /** 事件监听方法 */
        on(event: string, listener: (...args: any[]) => void): this;
        /** 关闭连接方法 */
        close?(): void | Promise<void>;
        /** 检查是否空闲 */
        isIdle?(): boolean;

        /** AWS SES实例 */
        ses: any;
        /** 日志记录器 */
        logger: Logger;
        /** 选项配置 */
        options: SesTransportConfig;
        /** 传输器名称 */
        name: string;
        /** 版本号 */
        version: string;
        /** 关联的Mail实例 */
        mailer?: Mailer;

        // 注意：SesTransport不实现on、close、isIdle方法
    }

    /**
     * SES传输器发送结果
     */
    export interface SesSentMessageInfo extends SentMessageInfo { }
}