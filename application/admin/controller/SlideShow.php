<?php


namespace app\admin\controller;


use think\Controller;
use think\Request;
use app\admin\model\SlideShow as SlideShowModel;

class SlideShow extends Controller
{
    public function index(Request $request){
     $sid = $request->get() ? $request->get()['sid'] : null;
     $data = SlideShowModel::name('slide_show')->where('sid',$sid)->find();
     $operation = $sid ? 'update' : 'insert';
     $this->assign([
         'operation'        =>  $operation,
         'data'             =>  $data
     ]);
     return $this->fetch('/slide-show');
    }
    public function handle (Request $request) {
        $result = $request->post();
        $data = [
            'title'     =>  $result['title'],
            'url'       =>  $result['url'],
            'img_url'   =>  $result['img_url'],
            'numerical' =>  $result['numerical'],
        ];
        if ($result["operation"] == "update") {
          $update =   SlideShowModel::name('slide_show')->where('sid',$result['sid'])->update($data);
            if(!$update) {
                return  res(null,'修改失败！',400);
            }
            return  res(null,'修改成功！',200);
        }
        if ($result["operation"] == "insert") {
            $insert =  SlideShowModel::name('slide_show')->insert($data);
            if(!$insert) {
                return  res(null,'新增失败！',400);
            }
            return  res(null,'新增成功！',200);
        }

    }
    public function del(Request $request)
    {
        return  del($request, 'slide_show', 'sid');
    }
}