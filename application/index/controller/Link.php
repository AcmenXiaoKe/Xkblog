<?php


namespace app\index\controller;


use think\Controller;
use think\facade\Validate;
use think\Request;
use app\admin\model\Link as LinkModel;

class Link extends Controller
{
    public function index()
    {
        $url =  $this->request->scheme() . '://' . $this->request->host() . '/';
        $data=  LinkModel::name('link')->where('state',true)->select();
        $this->assign([
            'url'       =>  $url,
            'data'      =>  $data
        ]);
     return   $this->fetch(TMPL_PATH.'/link');
    }
    public function ApplyFor (Request $request)
    {
        $result = $request->post();
        $Link = LinkModel::name('link')->where('url',$result['url'])->find();
        if($Link) {
            return json(res(null,'请不要重复申请！',400));
        }
        if(!Validate::isEmail($result['email'])) {
            return json(res(null,'邮箱格式不正确！',400));
        }
        $insert =  LinkModel::name('link')->insert($result);
        if(!$insert) {
            return json(res($result,'申请失败！',400));
        }
        return json(res($result,'申请成功！',200));
    }
}