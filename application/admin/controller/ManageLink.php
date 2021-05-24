<?php


namespace app\admin\controller;


use think\Controller;
use app\admin\model\Link as LinkModel ;
use think\Request;

class ManageLink extends Controller
{
    public function index()
    {
        $data = LinkModel::name('link')->select();
        $this->assign([
            'data'  =>  $data
        ]);
        return $this->fetch('/manage-link');
    }
    public function del(Request $request)
    {
       return del($request,'link','id');
    }
    public function edit(Request $request){
        return editState($request,'link','id');
    }


}