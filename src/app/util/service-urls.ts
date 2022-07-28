
import { environment } from '../../environments/environment'

export class ServiceUrls {
    public static rest ="/api"
    public static serverVersion = "/v1"
    public static servicePrefix = environment.API_URL + ServiceUrls.rest + ServiceUrls.serverVersion
    
    public static GET_USER = ServiceUrls.servicePrefix + "/users/user"
    public static REGISTER_USER = ServiceUrls.servicePrefix + "/users/register"
    public static GET_STATES = ServiceUrls.servicePrefix + "/state/states"
    public static CHECK_EMAIL = ServiceUrls.servicePrefix + "/users/checkEmail"
    public static LOGIN = ServiceUrls.servicePrefix + "/users/login"
    public static REQUEST_NEW_PASSWORD = ServiceUrls.servicePrefix + "/users/requestNewPassword"
    public static CHECK_VF_CODE = ServiceUrls.servicePrefix + "/users/checkVFCode"
    public static RESET_PASSWORD = ServiceUrls.servicePrefix + "/users/resetPassword"
    public static VERIFY_ACCOUNT = ServiceUrls.servicePrefix + "/users/verifyAccount"
    public static ADD_EMPLOYEE = ServiceUrls.servicePrefix + "/admin/addEmployee"

    public static GET_USER_BY_USERID = ServiceUrls.servicePrefix + "/users/getUserByUserId"
    public static VERIFY = ServiceUrls.servicePrefix + "/users/verify"

    public static CHECK_EMP_NO = ServiceUrls.servicePrefix + "/users/checkEmployeeNumber"
    public static UPDATE_EMPLOYEE = ServiceUrls.servicePrefix + "/admin/updateEmployee"
    public static DELETE_EMPLOYEE = ServiceUrls.servicePrefix + "/admin/deleteEmployee"

    public static ADD_SITE = ServiceUrls.servicePrefix + "/site/addSite"
    public static GET_EMPLOYEE_NAME = ServiceUrls.servicePrefix + "/site/getEmployeeName"
    public static GET_ASSIGNED_DATES = ServiceUrls.servicePrefix + "/site/getAssignedDates"

    public static ADD_AREA = ServiceUrls.servicePrefix + "/area/addArea"
    public static ADD_DUTY = ServiceUrls.servicePrefix + "/duty/addDuty"
    public static ASSIGN_TAG = ServiceUrls.servicePrefix + "/tag/assignTag"
    public static GET_SITE_TAG_DETAILS = ServiceUrls.servicePrefix + "/tag/getSiteDetails"
    public static GET_AREA_TAG_DETAILS = ServiceUrls.servicePrefix + "/tag/getAreaDetails"
    public static GET_DUTY_TAG_DETAILS = ServiceUrls.servicePrefix + "/tag/getDutyDetails"
    public static GET_TAG_DETAILS = ServiceUrls.servicePrefix + "/tag/getTagDetails"
    

}