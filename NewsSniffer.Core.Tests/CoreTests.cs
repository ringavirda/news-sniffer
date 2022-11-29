using NewsSniffer.Core.Features;
using NewsSniffer.Core.Models;

namespace NewsSniffer.Core.Tests;

public class CoreTests
{
    private readonly string _rawArticle = "Українська авіація протягом доби завдала чотири удари по російських окупантах. Наша авіація протягом поточної доби завдала чотири удари: три-по районах зосередження особового складу, озброєння і військової техніки противника і один - по позиції зенітного ракетного комплексу , - повідомив Генеральний штаб Збройних сил України у вечірньому зведенні. Крім того, воїни ракетних військ і артилерії вразили район зосередження особового складу, озброєння і військової техніки ворога, а також їх позицію зенітного ракетного комплексу. За даними Генштабу ЗСУ, загальні бойові втрати Росії в Україні з 24 лютого орієнтовно вже склали близько 85 тисяч 410 осіб ліквідованими. Також Росія втратила БПЛА оперативно - тактичного рівня - 1 тис. 537, крилаті ракети - 480, кораблі/катери - 16, автомобільної техніки та автоцистерн - 4 тис. 396, спеціальної техніки-161. За останню добу противник позбувся ще двох танків, п'яти бойових броньованих машин і п'яти артилерійських систем.";

    [Fact]
    public void GenerateNgramTest()
    {
        var result = Utils.ParseNgramFromString(_rawArticle);

        Assert.Equal(4, result.Value.Keys.Count);
    }

    [Fact]
    public void StringSimilarnessTest()
    {
        var str1 = "сказала";
        var str2 = "сказав";

        var similarness = Utils.CalculateSimilarity(str1, str2);

        Assert.True(similarness > 0.7);
    }

    [Fact]
    public async void FeatureSelectTest()
    {
        var selector = await FeatureSelectorFactory.GenerateFeatureSecectorAsync(
            await Corpus.GenerateCorpusAsync(
                new List<Tuple<string, string, string>> {
                    new Tuple<string, string, string>("test", "neuteral", _rawArticle) 
                    }),
            0.2,
            0.7
            );

        var processed = Utils.ParseNgramFromString(_rawArticle);
        var selected = selector.GenerateNgram(_rawArticle);

        Assert.True(processed.GetAllTerms().Count > selected.GetAllTerms().Count);
    }
}