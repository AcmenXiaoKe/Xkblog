<?php


namespace app\admin\controller;

use app\admin\model\SlideShow as SlideShowModel;
use think\Controller;
use think\Request;

class ManageSlideShow extends Controller
{
    public function index(){
        $data = SlideShowModel::name('slide_show')->order('numerical desc')->select();
        $this->assign([
            'data'  =>  $data
        ]);
        return   $this->fetch('/manage-slide_show');
    }

}