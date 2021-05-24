<?php


namespace app\admin\controller;


use app\admin\model\Article as ArticleModel;
use think\Controller;
use think\Db;
use app\admin\model\Categories as CategoriesModel;

class ManageCategories extends Controller
{
    public function index()
    {
        $data = CategoriesModel::name('categories')->select();
        $Data = [];
        for($i=0; $i < count((array)$data); $i++) {
            $total = ArticleModel::name('article')->where('crid',$data[$i]['crid'])->count();
            $Obj = [
                'crid'  =>  $data[$i]['crid'],
                'name'  =>  $data[$i]['name'],
                'total' =>  $total
            ];
            array_push($Data,$Obj);
        }

      $this->assign('data',$Data);
        return $this->fetch('/manage-categories');
    }

}

//        $modelDate  =Db::name('class')->select();
//
//        $Date = [];
//        $class_list = [];
//        for($i=0; $i < count((array)$modelDate); $i++) {
//                for ($j=0;$j< count((array)$modelDate); $j++) {
//                    if($modelDate[$j]['parent'] == $modelDate[$i]['clid']) {
//                        $parenDate = Db::name('class')->where('clid',$modelDate[$j]['clid'])->find();
//                        array_push($Date,$parenDate);
//                        $date = [
//                            'clid'   =>     $modelDate[$i]['clid'],
//                            'name'  =>     $modelDate[$i]['name'],
//                            'parent'=>     $modelDate[$i]['parent'],
//                            'child' =>      $Date
//                        ];
//                        array_push($class_list,$date);
//                    }
//
//
//                }
//
//        }
//