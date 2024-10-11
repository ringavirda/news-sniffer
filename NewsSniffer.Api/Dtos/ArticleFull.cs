using NewsSniffer.Common.Models;
using NewsSniffer.Core;
using NewsSniffer.Core.Features;
using NewsSniffer.Core.Models;

namespace NewsSniffer.Api.Dtos;

public class ArticleFull : Article
{
    public List<NgramViewModel> Ngram { get; set; } = null!;

    public static ArticleFull FromArticle(Article article, IFeatureSelector selector)
        => new()
        {
            Id = article.Id,
            Title = article.Title,
            ArticleHref = article.ArticleHref,
            Date = article.Date,
            OutletCode = article.OutletCode,
            Body = article.Body,
            Impression = article.Impression,
            Marker = article.Marker,
            // Dto part
            Ngram = Utils.NgramToViewModels(selector.GenerateNgram(article.Body))
        };
}