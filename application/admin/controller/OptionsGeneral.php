<?php


namespace app\admin\controller;


use think\Controller;
use think\Db;
use think\Request;

class OptionsGeneral extends Controller
{
    public function index(){

        $web_options = web_options();
        $this->assign('options',$web_options);
       return $this->fetch('/OptionsGeneral');
    }
    public function edit(Request  $request){
        $name = web_options()['name'];
        $data  = $request->post();
         $model = Db::name('options')->where('name',$name)->update($data);
         return redirect('/admin/options_general');

    }

}