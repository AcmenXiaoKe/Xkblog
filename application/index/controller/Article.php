<?php


namespace app\index\controller;


use think\Controller;
use app\admin\model\Article as ArticleModel;
use app\admin\model\Comments as CommentsModel;
use app\admin\model\Categories as CategoriesModel;
use think\facade\Env;
use think\Request;
use app\admin\model\User as UserModel;

class Article extends Controller
{
    public function index($id){
        $templatePath = include Env::get('config_path').'siteconfig.php';
        $url = \think\facade\Request::url(true);
        $data = ArticleModel::name('article')->where('aid',$id)->where('state',true)->find();
        // 如果文章不存在就抛出异常
        if($data === null) {
            throw new \think\Exception('文章不存在！', 404);
        }
        $next   = ArticleModel::name('article')->where('aid','>',$id)->order('aid asc')->limit('1')->find();
        $previous  =    ArticleModel::name('article')->where('aid','<',$id)->order('aid desc')->limit('1')->find();
        $catid =explode (",",$data['catid']);
        $CategoriesData = [];
        foreach ($catid as $key=>$item) {
            $Categories =  CategoriesModel::name('categories')->where('catid',$item)->find();
            array_push($CategoriesData,$Categories);
        }
        $Comments = CommentsModel::name('comments')->where('aid',$id)->where('state',true)->select();
        $authorInfo = UserModel::name('user')->where('name',$data['author'])->find();
        $this->assign([
            'data'          =>      $data,
            'comments'      =>      $Comments,
            'comments_total'=>      count((array)$Comments),
            'Categories'    =>      $CategoriesData,
            'next'          =>      $next,
            'previous'      =>      $previous,
            'authorInfo'    =>      $authorInfo,
            'url'           =>      $url,
        ]);
        ArticleModel::name('article')->where('aid',$id)->inc('browse',1)->update();
        return $this->fetch(TMPL_PATH.$templatePath['template'].'/article');

    }

    public function comments(Request $request){
        $data = $request->post();
        $insert =  CommentsModel::name('comments')->insert($data);
        return dump($insert);
        return res(null,'评论成功！',200);
    }
    public function praise(Request $request){
        $data = $request->post();
        $updateArticle =  ArticleModel::name('article')->where('aid',$data['id'])->inc('praise',1)->update();
        if($updateArticle) {
            return res(null,'点赞成功！',200);
        }
        return res(null,'点赞成失败！',500);


    }

}