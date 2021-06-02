<?php


namespace app\admin\controller;


use app\admin\model\Article as ArticleModel;
use think\Controller;
use think\facade\Cookie;
use app\admin\model\Comments as CommentsModel;
use app\admin\model\Link as LinkModel;

class Index extends Controller
{
    public function index()
    {
        // 获取最新文章
        $article  =   ArticleModel::name('article')->limit(10)->order("aid desc")->select();
        //获取最新评论
        $comments =    ArticleModel::name('comments')->limit(10)->order("cid desc")->select();
        // 待审评论
        $pdg_comments_total = CommentsModel::name('comments')->where('state',false)->count();
        // 文章草稿箱
        $pfg_article  =   ArticleModel::name('article')->where('state',false)->count();
        $this->assign([
            'article_total'         =>  getArticleTotal(),
            'browse_total'          =>  getBrowseTotal(),
            'comments_total'        =>  getCommentsTotal(),
            'categories_total'      =>  getCateGoriesTotal(),
            'article'               =>  $article,
            'comments'              =>  $comments,
            'pdg_comments_total'    =>  $pdg_comments_total,
            'pfg_article'           =>  $pfg_article
        ]);
        return $this->fetch('/index');

    }
}