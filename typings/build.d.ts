declare var ENVIRONMENT : string

namespace NodeJS {
    interface Global {
        ENVIRONMENT: typeof ENVIRONMENT
    }
}
