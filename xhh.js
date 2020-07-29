
console.log("========Hook Start==========")

String.prototype.format = function () {
    var values = arguments;
    return this.replace(/\{(\d+)\}/g, function (match, index) {
        if (values.length > index) {
            return values[index];
        } else {
            return "";
        }
    });
}

var JNI_LOAD_POINTER = Module.getExportByName('libnative-lib.so', 'JNI_OnLoad'); // �����õ� JNI_OnLoad�����ĵ�ַ
var BASE_ADDR = parseInt(JNI_LOAD_POINTER) - parseInt('0x1C6C'); // �ó���������JNI_OnLoad�ľ��Ե�ַ��ȥ������Ե�ַ�õ���ַ

// MDString
Java.perform(function() {
    var hookpointer = '0x' + parseInt(BASE_ADDR + parseInt('0x15C4')).toString(16) // ��ȡҪhook�����ĵ�ַ
    var pointer = new NativePointer(hookpointer) // ���ݷ�����ַ����NativePointer
    console.log('[MDString] hook pointer: ', pointer)
    
    var arg0, arg1, arg2, arg3
    Interceptor.attach(pointer, {
            onEnter: function(args) {
                arg0 = args[0]
                arg1 = args[1]
                arg2 = args[2]
                console.log('\n')
                console.log('=====> [MDString] -> [��������ǰ]')
                console.log('����1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
                console.log('����2: {0} => {1}'.format(arg1, Memory.readCString(arg1)))
                console.log('����3: {0} => {1}'.format(arg2, Memory.readCString(arg2)))
                console.log('\n')
            },
            onLeave: function(retval) {
                console.log('\n')
                console.log('=====> [MDString] -> [�������ú�]:')
                console.log('����ֵ: ', retval)
                console.log('����1: {0} => {1}'.format(arg0, Memory.readCString(arg0)))
                console.log('����2: {0} => {1}'.format(arg1, Memory.readCString(arg1)))
                console.log('����3: {0} => {1}'.format(arg2, Memory.readCString(arg2)))
                console.log('\n')
            }
        }   
    )
})
